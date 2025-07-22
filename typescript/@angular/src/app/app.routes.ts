import { Routes } from "@angular/router";
import { ManageInternsComponent } from "./admin/manage-interns/manage-interns.component";
import { ManageTrainersComponent } from "./admin/manage-trainers/manage-trainers.component";
import { ManageTrainingComponent } from "./admin/manage-training/manage-training.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./home/home.component";
import { MyTrainingComponent } from "./interns/my-training/my-training.component";
import { LoginComponent } from "./login/login.component";
import { ServicesComponent } from "./services/services.component";
import { ContactComponent } from "./contact/contact.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { MyCoursesComponent } from "./trainers/my-courses/my-courses.component";
import { MyInternsComponent } from "./trainers/my-interns/my-interns.component";
import { MyProfileComponent as MyTrainerProfileComponent } from "./trainers/my-profile/my-profile.component";
import { MyProfileComponent as MyInternProfileComponent } from "./interns/my-profile/my-profile.component";

export const routes: Routes = [
	{ path: "", redirectTo: "home", pathMatch: "full" },
	{ path: "home", component: HomeComponent },
	{ path: "services", component: ServicesComponent },
	{ path: "contact", component: ContactComponent },
	{ path: "dashboard", component: DashboardComponent },
	{ path: "login", component: LoginComponent },

	// Admin
	{ path: "admin/manage/interns", component: ManageInternsComponent },
	{ path: "admin/manage/trainers", component: ManageTrainersComponent },
	{ path: "admin/manage/training", component: ManageTrainingComponent },

	// Trainers
	{ path: "trainers/my-courses", component: MyCoursesComponent },
	{ path: "trainers/my-interns", component: MyInternsComponent },
	{ path: "trainers/my-profile", component: MyTrainerProfileComponent },

	// Interns
	{ path: "interns/my-training", component: MyTrainingComponent },
	{ path: "interns/my-profile", component: MyInternProfileComponent },

	// Others
	{ path: "**", component: NotFoundComponent },
];
