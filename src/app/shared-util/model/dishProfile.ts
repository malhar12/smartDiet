export interface DishProfile{
  _id: string,
  userId: string,
  dishId: string,
  name: string,
  price: number,
  description: string,
  imgLocation: string,
  type: string,
  created_at: Date,
  updated_at: Date
}
