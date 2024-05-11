export class OfferDTO {
  id: number
  title: string
  description: string
  userId: number
  cityId: number
  categoryId: number
  photo: string | null
  constructor(
    id: number,
    title: string,
    description: string,
    userId: number,
    cityId: number,
    categoryId: number,
    photo: string | null
  ) {
    this.id = id
    this.title = title
    this.description = description
    this.userId = userId
    this.cityId = cityId
    this.categoryId = categoryId
    this.photo = photo
  }
}
