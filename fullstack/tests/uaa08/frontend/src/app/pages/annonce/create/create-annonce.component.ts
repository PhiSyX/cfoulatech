import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, mergeMap, tap } from 'rxjs';

import { PageLayoutComponent } from '~/layouts/page-layout/page-layout.component';
import { Annonce } from '~/models/annonce';
import { Utilisateur } from '~/models/user';
import { AdresseService } from '~/services/adresse.service';
import { AnnonceService } from '~/services/annonce.service';
import { AuthService } from '~/services/auth.service';
import { FlashMessageService } from '~/services/flash-message.service';
import { ProprieteService } from '~/services/propriete.service';
import { UserService } from '~/services/user.service';

@Component({
  selector: 'app-create-annonce',
  imports: [ReactiveFormsModule, PageLayoutComponent],
  templateUrl: './create-annonce.component.html',
  styleUrl: './create-annonce.component.scss',
})
export class CreateAnnonceComponent implements OnInit
{
  currentUser: Utilisateur | null = null;

  currentStep = 0;
  forms: Array<FormGroup> = [];
  photos: Array<File> = [];
  photosSrc: Array<string> = [];
  editAnnonce: Annonce | null = null;

  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessageService,
    private adresseService: AdresseService,
    private proprieteService: ProprieteService,
    private annonceService: AnnonceService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  )
  {
  }

  get hasRights(): boolean
  {
    return (
      this.currentUser?.roles?.includes('ROLE_ADMIN') ||
      this.currentUser?.id === this.editAnnonce?.utilisateur?.id
    );
  }

  ngOnInit()
  {
    let maybeAnnonce = null;

    if (this.router.url.indexOf('/edit/') >= 0) {
      const nav = this.router.lastSuccessfulNavigation;
      maybeAnnonce = nav?.extras.state?.['annonce'] as Annonce || null;

      this.editAnnonce = maybeAnnonce;

      if (maybeAnnonce === null) {
        // @ts-expect-error
        const annonceId = Number(this.route.params.value.id);
        this.annonceService.fetchById(annonceId).pipe(catchError((err) => {
          this.router.navigate(['/annonces']);
          throw err;
        })).subscribe((annonce) => {
          this.editAnnonce = annonce;

          this.#makeFormSteps();

          if (!this.hasRights) {
            this.router.navigate(['/annonces']);
            this.flashMessage.error(
              "Vous n'êtes pas autorisé à éditer cette annonce.",
            );
            return;
          }
        });
      }
    }

    this.#makeFormSteps();

    this.authService.currentUser().subscribe((maybeUser) => {
      if (!maybeUser) return;

      this.currentUser = maybeUser;

      if (this.editAnnonce && !this.hasRights) {
        this.router.navigate(['/annonces']);
        this.flashMessage.error(
          "Vous n'êtes pas autorisé à éditer cette annonce.",
        );
        return;
      }
    });
  }

  #makeFormSteps()
  {
    this.forms = [
      this.formBuilder.group({
        typeDeBien: [this.editAnnonce?.propriete.type || '', [Validators.required]],
        titre: [this.editAnnonce?.propriete.titre || '', [Validators.required]],
        description: [this.editAnnonce?.propriete.description || '', [Validators.minLength(20)]],
        prix: [this.editAnnonce?.propriete.prix || '', [Validators.required]],
        surfaceM2: [this.editAnnonce?.propriete.surfaceM2 || '', [Validators.required]],
        nombrePieces: [this.editAnnonce?.propriete.nombrePieces || '', [Validators.required]],
        nombreChambres: [this.editAnnonce?.propriete.nombreChambres || '', [Validators.required]],
      }),

      this.formBuilder.group({
        rue: [this.editAnnonce?.propriete.adresse.rue || '', [Validators.required]],
        numero: [this.editAnnonce?.propriete.adresse.numero || '', [Validators.required]],
        codePostal: [this.editAnnonce?.propriete.adresse.codePostal || '', [Validators.required]],
        ville: [this.editAnnonce?.propriete.adresse.ville || '', [Validators.required]],
        pays: [this.editAnnonce?.propriete.adresse.pays || '', [Validators.required]],
      }),

      this.formBuilder.group({}),

      this.formBuilder.group({
        annonce: [this.editAnnonce?.message || '', [Validators.required]],
        typeAchat: [this.editAnnonce?.type || '', [Validators.required]],
      }),
    ];
  }

  handleSubmit()
  {
    if (!this.currentUser?.verified) {
      this.flashMessage.warning(
        "Vous devez d'abord vérifier votre compte avant de pouvoir effectuer cette action.",
      );
      return;
    }

    if (!this.forms[this.currentStep].valid) {
      this.flashMessage.error('Veuillez remplir tous les champs du formulaire');
      return;
    }

    if (this.currentStep !== this.forms.length - 1) {
      this.nextStep();
      return;
    }

    // Adresse
    const adresse = this.forms[1].value;
    // Propriété
    const propriete = this.forms[0].value;
    // Photos
    const photos = this.photos;
    // Annonce
    const annonce = this.forms[3].value;

    if (this.editAnnonce) {
      this.adresseService.update(this.editAnnonce.propriete.id, {
        codePostal: adresse.codePostal,
        numero: adresse.numero,
        pays: adresse.pays,
        rue: adresse.rue,
        ville: adresse.ville,
      })
      .pipe(
        mergeMap(() => this.proprieteService.update(this.editAnnonce!.propriete.id, {
          type: propriete.typeDeBien,
          titre: propriete.titre,
          description: propriete.description,
          prix: propriete.prix,
          surfaceM2: propriete.surfaceM2,
          nombrePieces: propriete.nombrePieces,
          nombreChambres: propriete.nombreChambres,
        })),
        mergeMap(() => this.annonceService.update(this.editAnnonce!.id, {
          type: annonce.typeAchat,
          message: annonce.annonce,
        })),
      )
      .subscribe((annonce) => {
        this.flashMessage.success(`Votre annonce a bien été modifiée`);

        this.router.navigate(
          [`/annonce/${annonce.id}`],
          { state: { annonce: annonce },
        });
      });

      return;
    }

    this.adresseService.create({
      codePostal: adresse.codePostal,
      numero: adresse.numero,
      pays: adresse.pays,
      rue: adresse.rue,
      ville: adresse.ville,
    }).pipe(
      mergeMap((res) => this.proprieteService.create({
        type: propriete.typeDeBien,
        titre: propriete.titre,
        description: propriete.description,
        prix: propriete.prix,
        surfaceM2: propriete.surfaceM2,
        nombrePieces: propriete.nombrePieces,
        nombreChambres: propriete.nombreChambres,
        adresse: res["@id"],
        proprietaire: `/api/utilisateurs/${this.currentUser!.id}`,
        photos: [],
      })),
      tap((res) => {
        for (const photo of photos) {
          this.proprieteService.upload(res.id, photo).subscribe((_) => {
          });
        }
      }),
      mergeMap((res) => {
        return this.annonceService.create({
          type: annonce.typeAchat,
          utilisateur: `/api/utilisateurs/${this.currentUser!.id}`,
          propriete: res['@id'],
          message: annonce.annonce,
        });
      }),
      tap((_) => {
        this.userService.update(this.currentUser!, {
          role: 'ROLE_PROPRIETAIRE',
        }).subscribe(() => {
        });
      }),
    ).subscribe((annonce) => {
      this.flashMessage.success(`Votre annonce a bien été publié`);
      this.router.navigate([`/annonce/${annonce.id}`]);
    });
  }

  handleImage(evt: Event)
  {
    // @ts-expect-error
    this.photos = Array.from(evt.target.files);

    for (const photo of this.photos) {
      const reader = new FileReader();
      reader.readAsDataURL(photo);

      reader.addEventListener('load', (_) => {
        this.photosSrc.push(reader.result as string);
      });
    }
  }

  deletePhoto(photoIndex: number): void
  {
    this.photos = this.photos.filter((_, idx) => idx !== photoIndex);
    this.photosSrc = this.photosSrc.filter((_, idx) => idx !== photoIndex);
  }

  nextStep()
  {
    this.currentStep += 1;
    if (this.editAnnonce && this.currentStep === 2) {
      this.currentStep += 1;
    }
  }

  prevStep()
  {
    this.currentStep -= 1;
    if (this.editAnnonce && this.currentStep === 2) {
      this.currentStep -= 1;
    }
  }
}
