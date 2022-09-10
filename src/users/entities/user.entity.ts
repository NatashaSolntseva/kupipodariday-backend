import { IsNotEmpty, Length } from 'class-validator';
import { Offer } from 'src/offers/entities/offer.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @IsNotEmpty()
  @Length(2, 30)
  username: string;

  @Column({
    default: 'Пока ничего не рассказал о себе',
  })
  @Length(2, 200)
  about: string;

  @Column({
    default: 'https://i.pravatar.cc/300',
  })
  avatar: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Wish, (wish) => wish) // TODO добавить поле
  wishes: Wish[];

  @OneToMany(() => Offer, (offer) => offer) // TODO добавить поле
  offers: Offer[];

  @OneToMany(() => Wishlist, (Wishlist) => Wishlist) // TODO добавить поле
  wishList: Wishlist[];
}

/*
@PrimaryGeneratedColumn ()
частный случай декоратора столбца, означающий,
что он будет первичным сгенерированным ключом.
То есть, возрастающим идентификатором (например, “1,2,3....”).
Во всех БД такие поля немного по разному реализованы, и удобно, что ORM позволяет спрятать эти различия под капотом.
*/
