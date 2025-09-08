import { Component, OnInit } from "@angular/core";
import { TrainingService } from '../../services/training.service';

@Component({
	selector: "app-intern-my-training",
	imports: [],
	templateUrl: "./my-training.component.html",
	styleUrl: "./my-training.component.scss",
})
export class MyTrainingComponent implements OnInit
{
	constructor(
		private trainingService: TrainingService,
	)
	{
	}

	ngOnInit()
	{
		// this.trainingService.all()
		// 	.subscribe((trainings) => {
		// 		console.log(trainings);
		// 	});
	}
}
