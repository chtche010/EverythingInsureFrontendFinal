import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-claim-review',
  templateUrl: './claim-review.component.html',
  styleUrls: ['./claim-review.component.css']
})

export class ClaimReviewComponent {
  claimdetails: any;
  claimId!: string;

  constructor(private authService: AuthService, private route: ActivatedRoute,) {}

ngOnInit(): void {
  this.claimId = this.route.snapshot.paramMap.get('claimId')!;
  this.getclaimbyid(this.claimId);
}

getclaimbyid(claimId: string): void {
  this.authService.getclaimbyid(claimId).subscribe(
    (response) => {
      console.log(response)
      this.claimdetails = response.data;
      console.log('Claim details', this.claimdetails);
    },
    (error) => {
      console.log('Error returning claim details', error)
    }
  );
}
}
