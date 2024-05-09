export class CreateOfferModel {
  id: number;
  title: string;
  description: string;
  userId: number;
  cityId: number;
  categoryId: number;
  file: File | null;

  constructor() {
    this.id = 0;
    this.title = "";
    this.description = "";
    this.userId = 0;
    this.cityId = 1;
    this.categoryId = 1;
    this.file = null;
  }
}
