import { NgTemplateOutlet, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AlertComponent } from '~/components/alert/alert.component';
import { AnnonceCardComponent } from '~/components/annonce/annonce-card/annonce-card.component';
import { LoaderComponent } from '~/components/loader/loader.component';
import { PageLayoutComponent } from '~/layouts/page-layout/page-layout.component';
import { Annonce, AnnonceCollection } from '~/models/annonce';
import { Utilisateur } from '~/models/user';
import { AnnonceService } from '~/services/annonce.service';
import { AuthService } from '~/services/auth.service';

interface CheckboxChoice
{
  checked: boolean;
  value: string;
  paramKey: string;
}

interface RadioChoice
{
  name: string,
  text: string;
  selected: boolean;
  value: string;
  paramKey: string;
}

interface CustomPrixChoice
{
  selected: boolean;
  min: string | null;
  max: string | null;
  paramKey: string;
}

@Component({
  selector: 'app-listing-annonce',
  imports: [
    AlertComponent,
    AnnonceCardComponent,
    LoaderComponent,
    ReactiveFormsModule,
    TitleCasePipe,
    PageLayoutComponent,
    NgTemplateOutlet,
  ],
  templateUrl: './listing-annonce.component.html',
  styleUrl: './listing-annonce.component.scss',
})
export class ListingAnnonceComponent implements OnInit
{
  currentPage = 1;
  prevPage = 1;
  nextPage = 1;
  currentUser: Utilisateur | null = null;
  userQSFilters: URLSearchParams = new URLSearchParams();
  annonceCollection: AnnonceCollection | null = null;

  formFilters = {
    codePostaux: [] as Array<{
      checked: boolean;
      value: string;
      paramKey: string;
    }>,
    villes: [] as Array<CheckboxChoice>,
    pays: [] as Array<CheckboxChoice>,
    typesAchat: [] as Array<CheckboxChoice>,
    typesBien: [] as Array<CheckboxChoice>,
    presetPrix: [] as Array<RadioChoice>,
    customPrix: {
      selected: false,
      min: '50000',
      max: '75000',
      paramKey: 'propriete.prix[between]',
    } as CustomPrixChoice,
  };

  withFilter: boolean = false;

  constructor(
    private authService: AuthService,
    private annonceService: AnnonceService,
  )
  {
  }

  ngOnInit()
  {
    if (window.location.href.includes('?')) {
      this.userQSFilters = this.#convertUserQsToApiQs(
        (new URL(window.location.href)).searchParams,
      );
    }

    this.authService.currentUser().subscribe(user => {
      this.currentUser = user;
    });

    this.loadAnnonces();
  }

  loadAnnonces()
  {
    this.annonceService.fetchLatest(this.currentPage, this.userQSFilters).subscribe((col) => {
      this.annonceCollection = col;
      this.#makeFilters();
      this.#makePagination();
    });
  }

  #makePagination()
  {
    if (!this.annonceCollection?.pagination) {
      return
    }

    if (this.annonceCollection.pagination.previous) {
      const prevPage = new URL(
        `${window.location.protocol}//${window.location.host}${this.annonceCollection.pagination.previous}`,
      ).searchParams?.get('page');

      if (prevPage) {
        this.prevPage = Number(prevPage);
      }
    }

    if (this.annonceCollection.pagination.next) {
      const nextPage = new URL(
        `${window.location.protocol}//${window.location.host}${this.annonceCollection.pagination.next}`,
      ).searchParams?.get('page');


      if (nextPage) {
        this.nextPage = Number(nextPage);
      }
    }
  }

  #convertUserQsToApiQs(qs: URLSearchParams)
  {
    const toApiQs = {
      'type[]': 'type[]',
      'bien[]': 'propriete.type[]',
      'pays[]': 'propriete.adresse.pays[]',
      'ville[]': 'propriete.adresse.ville[]',
      'codePostal[]': 'propriete.adresse.codePostal[]',
      'prix[lte]': 'propriete.prix[lte]',
      'prix[gte]': 'propriete.prix[gte]',
      'prix[between]': 'propriete.prix[between]',
      'page': 'page',
    };

    const tempsQs = new URLSearchParams();

    for (const [k, v] of qs.entries()) {
      if (k in toApiQs) {
        // @ts-expect-error
        tempsQs.append(toApiQs[k], v);
      } else {
        console.warn('convertUserQsToApiQs', k, v);
      }
    }

    return tempsQs;
  }

  #convertApiQsToUserQs(qs: URLSearchParams)
  {
    const toUserQs = {
      'type[]': 'type[]',
      'propriete.type[]': 'bien[]',
      'propriete.adresse.pays[]': 'pays[]',
      'propriete.adresse.ville[]': 'ville[]',
      'propriete.adresse.codePostal[]': 'codePostal[]',
      'propriete.prix[lte]': 'prix[lte]',
      'propriete.prix[gte]': 'prix[gte]',
      'propriete.prix[between]': 'prix[between]',
    };

    const tempsQs = new URLSearchParams();

    for (const [k, v] of qs.entries()) {
      if (k in toUserQs) {
        // @ts-expect-error
        tempsQs.append(toUserQs[k], v);
      } else {
        console.warn('convertApiQsToUserQs', k, v);
      }
    }

    return tempsQs;
  }

  #makeFilters()
  {
    this.withFilter = this.userQSFilters.size > 0;

    const makeChoices = (
      arr: Array<Annonce>,
      mappedBy: (annonce: Annonce) => string,
      paramKey: string,
    ) => {
      const tempSet = new Set(arr.map(mappedBy));
      const tempArr = [];

      for (const item of tempSet) {
        if (tempArr.length >= 5) {
          break;
        }

        tempArr.push({
          checked: this.userQSFilters.has(paramKey, item),
          value: item,
          paramKey,
        });
      }

      return tempArr;
    };

    const makeChoice = (
      name: string,
      text: string,
      paramKey: string,
      value: string,
    ) => {
      return {
        name,
        text,
        selected: this.userQSFilters.has(paramKey, value),
        value: value,
        paramKey,
      };
    };

    const annonces = this.annonceCollection?.annonces || [];

    const codePostaux = makeChoices(annonces, (annonce) => annonce.propriete.adresse.codePostal.toString(), 'codePostal[]');
    const villes = makeChoices(annonces, (annonce) => annonce.propriete.adresse.ville, 'ville[]');
    const pays = makeChoices(annonces, (annonce) => annonce.propriete.adresse.pays, 'pays[]');

    const typesAchat = makeChoices(annonces, (annonce) => annonce.type, 'type[]');
    const typesBien = makeChoices(annonces, (annonce) => annonce.propriete.type, 'bien[]');

    let hasSelectedPresetPrice = false;

    const presetPrix = [
      makeChoice('bellow100k', 'En dessous de 100 k €', 'prix[lte]', '100000'),
      makeChoice('between100kAnd250k', '100 k € ~ 250 k €', 'prix[between]', '100000..250000'),
      makeChoice('above300k', 'Au dessus de 300 k €', 'prix[gte]', '300000'),
    ].reduce((acc, item, idx) => {
      const oldItem = acc.at(idx - 1);

      if (!oldItem) {
        return [item];
      }

      if (oldItem.selected === item.selected) {
        oldItem.selected = false;
      }

      if (item.selected) {
        hasSelectedPresetPrice = true;
      }

      return [...acc, item];
    }, [] as Array<RadioChoice>);

    const [customPrixMin = null, customPrixMax = null] = this.userQSFilters.get('prix[between]')?.split('..') || [];

    const customPrix = {
      selected: !hasSelectedPresetPrice && this.userQSFilters.has('prix[between]'),
      min: customPrixMin,
      max: customPrixMax,
      paramKey: 'prix[between]',
    };

    this.formFilters = {
      codePostaux,
      villes,
      pays,
      typesAchat,
      typesBien,
      presetPrix,
      customPrix,
    };
  }

  #makeRequest(filters?: URLSearchParams)
  {
    const qs = new URLSearchParams(filters);

    const makeLocalites = () => {
      for (const codePostal of this.formFilters.codePostaux) {
        if (codePostal.checked) qs.append(codePostal.paramKey, codePostal.value);
      }

      for (const ville of this.formFilters.villes) {
        if (ville.checked) qs.append(ville.paramKey, ville.value);
      }

      for (const pays of this.formFilters.pays) {
        if (pays.checked) qs.append(pays.paramKey, pays.value);
      }
    };

    const makePresetPrix = () => {
      for (const prix of this.formFilters.presetPrix) {
        if (prix.selected) qs.set(prix.paramKey, prix.value);
      }
    };

    const makeCustomPrix = () => {
      if (this.formFilters.customPrix.selected) {
        let { min, max, paramKey } = this.formFilters.customPrix;

        min ||= "0";
        max ||= String(Number(min) + 1);
        max ||= "1";

        qs.append(paramKey, `${min}..${max}`);
      }
    };

    const makeTypesAchat = () => {
      for (const typeAchat of this.formFilters.typesAchat) {
        if (typeAchat.checked) qs.append(typeAchat.paramKey, typeAchat.value);
      }
    };

    const makeTypesBien = () => {
      for (const typeBien of this.formFilters.typesBien) {
        if (typeBien.checked) qs.append(typeBien.paramKey, typeBien.value);
      }
    };

    makeLocalites();
    makePresetPrix();
    makeCustomPrix();
    makeTypesAchat();
    makeTypesBien();

    if (qs.size > 0) {
      this.withFilter = true;
    }

    this.annonceService.fetchWithCustomFilters(this.#convertUserQsToApiQs(qs)).subscribe((col) => {
      this.annonceCollection = col;

      if (qs.size > 0) {
        window.history.pushState(null, "", `${window.location.pathname}?${qs.toString()}`);
      } else {
        window.history.pushState(null, "", `${window.location.pathname}`);
      }
    });
  }

  /**
   * Handlers
   */

  handleChange(evt: Event)
  {
    const inputEl = evt.target as HTMLInputElement;
    const inputType = inputEl.type;
    const inputValue = inputEl.value;
    const inputName = inputEl.name;

    switch (inputType) {
      case "checkbox": {
        // @ts-expect-error
        const inputFilter = this.formFilters[inputName] as Array<CheckboxChoice>;

        // @ts-expect-error
        this.formFilters[inputName] = inputFilter.map((item) => {
          if (item.value === inputValue) {
            return {
              ...item,
              checked: !item.checked,
            };
          }
          return item;
        });
      }
        break;

      case "radio": {
        const radioName: "customPrix" | "presetPrix" = inputValue === "on" ? "customPrix" : "presetPrix";

        const inputFilter = this.formFilters[radioName] as
          | Array<RadioChoice>
          | CustomPrixChoice
        ;

        if (Array.isArray(inputFilter)) {
          this.formFilters.presetPrix = inputFilter.map((item) => {
            if (item.value === inputValue) {
              return {
                ...item,
                selected: true,
              };
            }

            return {
              ...item,
              selected: false,
            };
          });
          this.formFilters.customPrix.selected = false;
          break;
        }

        this.formFilters.customPrix.selected = inputValue === 'on';
        this.formFilters.presetPrix = this.formFilters.presetPrix.map((item) => {
          return {
            ...item,
            selected: false,
          };
        });

        return;
      }

      case "number": {
        if (inputEl.id === "customPrixMin") {
          this.formFilters.customPrix.min = inputValue;
        } else {
          this.formFilters.customPrix.max = inputValue;
        }
      }
        break;
    }

    this.#makeRequest();
  }

  handleRadioClick(evt: MouseEvent)
  {
    if (!evt.altKey) {
      return;
    }

    const inputEl = evt.target as HTMLInputElement;
    const inputType = inputEl.type;
    const inputValue = inputEl.value;

    switch (inputType) {
      case "radio": {
        const radioName: "customPrix" | "presetPrix" = inputValue === "on" ? "customPrix" : "presetPrix";

        const inputFilter = this.formFilters[radioName] as
            | Array<{
            name: string,
            text: string;
            selected: boolean;
            value: string;
            paramKey: string;
          }>
            | {
            selected: boolean;
            min: string | null;
            max: string | null;
            paramKey: string
          }
        ;

        inputEl.checked = false;

        if (Array.isArray(inputFilter)) {
          this.formFilters.presetPrix = this.formFilters.presetPrix.map((p) => {
            return {
              ...p,
              selected: false,
            }
          })
          break;
        }

        this.formFilters.customPrix.selected = false;
      }
        break;
    }

    this.#makeRequest();
  }

  onDeleteAnnonce(annonce: Annonce)
  {
    this.annonceService.remove(annonce).subscribe(() => {
      window.location.reload();
    });
  }

  preventAndStop(evt: Event)
  {
    evt.preventDefault();
    evt.stopPropagation();
  }

  addChoice(evt: Event, arr: Array<CheckboxChoice>, paramKey: string)
  {
    evt.preventDefault();

    const inputEl = evt.target as HTMLInputElement;
    const inputVal = inputEl.value;

    const item = arr.find((item) => item.value.toLowerCase() === inputVal.toLowerCase());
    if (item) {
      item.checked = true;
    } else {
      arr.push({ checked: true, value: inputVal, paramKey: paramKey })
    }

    inputEl.value = '';

    this.#makeRequest();
  }

  paginateTo(apiPath: string)
  {
    const pageParams = new URL(
      `${window.location.protocol}//${window.location.host}${apiPath}`,
    ).searchParams;
    const page = pageParams?.get('page');

    if (!page) {
      return;
    }

    this.currentPage = Number(page);
    const filters = new URLSearchParams({ page: page });
    this.#makeRequest(filters);
  }

  paginateToPrev()
  {
    this.currentPage -= 1;
    this.paginateTo(this.annonceCollection?.pagination.previous!);
  }

  paginateToNext()
  {
    this.currentPage += 1;
    this.paginateTo(this.annonceCollection?.pagination.next!);
  }
}
