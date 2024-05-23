export class OfferDTO {
  id: number;
  title: string;
  description: string;
  userId: number;
  userEmail: string
  cityId: number;
  categoryId: number;
  file: string | null;
  constructor(id: number, title: string, description: string, userId: number, userEmail: string, cityId: number, categoryId: number,   file: string | null) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.userId = userId;
    this.userEmail=  userEmail;
    this.cityId = cityId;
    this.categoryId = categoryId;
    this.file = file;
  }
}
