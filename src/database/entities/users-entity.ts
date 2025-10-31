import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';

import { SecretCode, MediaFiles, Message, Chat, Posts, Comments } from '../entities'
import { confidential } from '../enums';
import { Base } from './base';


@Entity('users')
export class User extends Base {
  @Column({ name: 'first_name', nullable: true})
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ unique: true })
  phone: string;

  @Column({ nullable: true })
  age: number

  @ManyToMany(() => MediaFiles, { cascade: true })
  @JoinTable({
    name: 'user_media_files',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'media_file_id', referencedColumnName: 'id' },
  })
  mediaFiles: MediaFiles[]

  @ManyToMany(() => User)
  @JoinTable({ name: 'user_friends' })
  friends: User[];

  @ManyToMany(() => Chat, (chat) => chat.members)
  chats: Chat[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @Column({ default: confidential.PUBLIC })
  confidentiality: confidential

  @OneToMany(() => Posts, (post) => post.user)
  posts: Posts[];

  @OneToMany(() => Comments, (comment) => comment.author)
  comments: Comments[];

  @OneToMany(() => SecretCode, (secretCode) => secretCode.user, { cascade: true })
  secretCodes: any;

}

