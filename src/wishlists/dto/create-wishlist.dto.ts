import { IsArray, IsNumber, IsOptional, IsString, IsUrl, Length } from "class-validator";

export class CreateWishlistDto {
  // name — название списка. Не может быть длиннее 250 символов и короче одного;
  @IsString()  
  @IsOptional()
  @Length(1, 250)
  name: string;

  // image — обложка для подборки
  @IsString()
  @IsUrl()
  @IsOptional()
  image: string;

  // items содержит набор ссылок на подарки.
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  itemsId: number[];
}
