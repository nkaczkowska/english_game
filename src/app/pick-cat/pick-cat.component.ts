import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { CommonModule, NgFor, NgIf, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { PlayingService } from 'app/play/playing.service';
import { QuestionsService } from 'app/questions.service';
import { FormsModule } from '@angular/forms';
import { InfoButtonComponent } from 'app/info-button/info-button.component';

@Component({
  selector: 'app-pick-cat',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, InfoButtonComponent, NgClass],
  templateUrl: './pick-cat.component.html',
  styleUrl: './pick-cat.component.css'
})

export class PickCatComponent implements OnInit {

  categories: any[] = []; //all the categories in the database
  filteredCategories: any[]= []; //the categories which match the livesearch query
  totalNumOfTriesForAll: number = 0; //total number of tries for all categories (number of crowns collected)
  searchQuery: string = '';
  isRemoveMode: boolean = false;
  imgSrc = '';
  canPlayVideo: boolean = false;
  isVideoVisible: boolean = false;
  videoSrc = ''; //current video source
  videos: string[] = ['assets/video1.mp4', 'assets/video2.mp4', 'assets/video3.mp4', 'assets/video4.mp4', 'assets/video5.mp4', 'assets/video6.mp4' ]




  constructor (private router: Router, private playing: PlayingService, private categoryService: CategoryService, private questionsService: QuestionsService){
  }


  ngOnInit(): void { //all the categories in the game are imported 
    this.loadCategories();
    this.loadTotalNumOfTriesForAll();

  }


  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.filteredCategories = data; //initially filteredCategories[] holds data of all the categories 
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
    });
  }


  loadTotalNumOfTriesForAll(): void {
    this.categoryService.getTotalNumOfTriesForAll().subscribe({
      next: (total) => {
        this.totalNumOfTriesForAll = total;
        this.checkVideoEligibility(); //checking if this is enough for a video
      },
      error: (error) => {
        console.error('Error fetching total number of tries:', error);
      },
    });
  }


  checkVideoEligibility(): void {
    //it enables the button if totalNumOfTriesForAll is a multiple of 20
    this.canPlayVideo = this.totalNumOfTriesForAll % 20 === 0 && this.totalNumOfTriesForAll !== 0; 
    console.log('Eligibility checked, canPlayVideo:', this.canPlayVideo);

  }

  updateVideoSource(): void {
    const index = Math.floor(this.totalNumOfTriesForAll / 20) % this.videos.length;
    this.videoSrc = this.videos[index];
    console.log(`Video source updated to: ${this.videoSrc}`);
  }

  showVideo(): void {
    console.log('canPlayVideo:', this.canPlayVideo);
    if (!this.canPlayVideo) return;
    console.log("Show video called");

    this.updateVideoSource();
    this.isVideoVisible = true;
    this.canPlayVideo = false; //disables the button until the next 20 crowns
  }

  closeVideo(): void {
    this.isVideoVisible = false;
  }

  enableRemoveMode(): void {
    const password = prompt('Enter the admin password to remove categories:');
    if (password == 'share') {
      this.isRemoveMode = true;
    }
    else {
      alert('Incorrect password.');
    }
  }

  disableRemoveMode(): void{
    this.isRemoveMode = false;
  }

  deleteCategory(categoryId: number): void {
    if (confirm('Are you sure you want to delete this category and its related data?')) {
      this.categoryService.deleteCategory(categoryId).subscribe({
        next: () => {
          alert('Category deleted successfully.');
          this.loadCategories(); //reload categories after deletion
          
        },
        error: (err) => {
          console.error('Error deleting category:', err);
          alert('Failed to delete category');
        }
      })
    }
  }

 
  displayQuestionsFromCat(catName: string| undefined): void {


    if (!catName) {
      console.error('Category name is undefined.');
      return; //stop further execution if catName is not defined
    }

    this.questionsService.getCategoryIdByName(catName).subscribe({
      next: (categoryId: number) => {
        this.playing.setCurrentCatID(categoryId); //setting the catID in the playing service
  
        this.navigateToPreGame();
      },
      error: (err) => {
        console.error('Error fetching category ID:', err);
      },
    });
  
  }

  filterCategories(): void{ //filtering the categories to find those that match the livesearch query
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredCategories = this.categories.filter((category) => category.name.toLowerCase().includes(query)
  );
  }
  

  navigateToPreGame(){
    this.router.navigate(['/pre-game']);
  }
}
