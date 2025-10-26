import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1761477354903 implements MigrationInterface {
    name = ' $npmConfigName1761477354903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "messages" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "text" character varying NOT NULL, "userId" integer, "chatId" integer, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "likes" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "postId" integer, "commentId" integer, CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "text" character varying NOT NULL, "postId" integer, "authorId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying, "last_name" character varying, "phone" character varying NOT NULL, "age" integer, "confidentiality" character varying NOT NULL DEFAULT 'public', CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying, "userId" integer, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "secret_code" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "code" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_610a9caa2f2a1850b40c4151a3f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chats" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "ownerId" integer NOT NULL, "type" "public"."chats_type_enum" NOT NULL DEFAULT 'private', "ownerIdId" integer, CONSTRAINT "PK_0117647b3c4a4e5ff198aeb6206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "media_files" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "path" character varying NOT NULL, "size" integer NOT NULL, "meta" jsonb, CONSTRAINT "PK_93b4da6741cd150e76f9ac035d8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_media_files" ("user_id" integer NOT NULL, "media_file_id" integer NOT NULL, CONSTRAINT "PK_357462598c18ca7fc05dc342662" PRIMARY KEY ("user_id", "media_file_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e1846a30fd64b7721f23499d78" ON "user_media_files" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_66284736af2f31f95c22d0b36c" ON "user_media_files" ("media_file_id") `);
        await queryRunner.query(`CREATE TABLE "user_friends" ("usersId_1" integer NOT NULL, "usersId_2" integer NOT NULL, CONSTRAINT "PK_283fae77b32d5f391bf4ae740bc" PRIMARY KEY ("usersId_1", "usersId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_082f93507aad6ee05e92abf211" ON "user_friends" ("usersId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_7f9fb03bbbea6bfad789729ead" ON "user_friends" ("usersId_2") `);
        await queryRunner.query(`CREATE TABLE "post_media_files" ("post_id" integer NOT NULL, "media_file_id" integer NOT NULL, CONSTRAINT "PK_e4e4492a32d7fae2ee8d67b95e8" PRIMARY KEY ("post_id", "media_file_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c0ddc5f43e0f2fb14d73ee7cb3" ON "post_media_files" ("post_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_d9f76a4b34ee9d3362513edb8c" ON "post_media_files" ("media_file_id") `);
        await queryRunner.query(`CREATE TABLE "users_chats" ("chat_id" integer NOT NULL, "members_id" integer NOT NULL, CONSTRAINT "PK_458a976a5337ea1ed94f6d066f4" PRIMARY KEY ("chat_id", "members_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_96069fbdbdb77b59fbf424087c" ON "users_chats" ("chat_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_092d4a48311d681de32cf80fc0" ON "users_chats" ("members_id") `);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_36bc604c820bb9adc4c75cd4115" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_e2fe567ad8d305fefc918d44f50" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_ec3c75d6522fc60e0ebaf58a6b7" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_4548cc4a409b8651ec75f70e280" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "secret_code" ADD CONSTRAINT "FK_31eaffc464cf1a56c15b7bba7e5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chats" ADD CONSTRAINT "FK_66ade84e03c8865d3ce0c677e66" FOREIGN KEY ("ownerIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_media_files" ADD CONSTRAINT "FK_e1846a30fd64b7721f23499d789" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_media_files" ADD CONSTRAINT "FK_66284736af2f31f95c22d0b36c1" FOREIGN KEY ("media_file_id") REFERENCES "media_files"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_friends" ADD CONSTRAINT "FK_082f93507aad6ee05e92abf2116" FOREIGN KEY ("usersId_1") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_friends" ADD CONSTRAINT "FK_7f9fb03bbbea6bfad789729ead3" FOREIGN KEY ("usersId_2") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "post_media_files" ADD CONSTRAINT "FK_c0ddc5f43e0f2fb14d73ee7cb35" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "post_media_files" ADD CONSTRAINT "FK_d9f76a4b34ee9d3362513edb8c2" FOREIGN KEY ("media_file_id") REFERENCES "media_files"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_chats" ADD CONSTRAINT "FK_96069fbdbdb77b59fbf424087c4" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_chats" ADD CONSTRAINT "FK_092d4a48311d681de32cf80fc0c" FOREIGN KEY ("members_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_chats" DROP CONSTRAINT "FK_092d4a48311d681de32cf80fc0c"`);
        await queryRunner.query(`ALTER TABLE "users_chats" DROP CONSTRAINT "FK_96069fbdbdb77b59fbf424087c4"`);
        await queryRunner.query(`ALTER TABLE "post_media_files" DROP CONSTRAINT "FK_d9f76a4b34ee9d3362513edb8c2"`);
        await queryRunner.query(`ALTER TABLE "post_media_files" DROP CONSTRAINT "FK_c0ddc5f43e0f2fb14d73ee7cb35"`);
        await queryRunner.query(`ALTER TABLE "user_friends" DROP CONSTRAINT "FK_7f9fb03bbbea6bfad789729ead3"`);
        await queryRunner.query(`ALTER TABLE "user_friends" DROP CONSTRAINT "FK_082f93507aad6ee05e92abf2116"`);
        await queryRunner.query(`ALTER TABLE "user_media_files" DROP CONSTRAINT "FK_66284736af2f31f95c22d0b36c1"`);
        await queryRunner.query(`ALTER TABLE "user_media_files" DROP CONSTRAINT "FK_e1846a30fd64b7721f23499d789"`);
        await queryRunner.query(`ALTER TABLE "chats" DROP CONSTRAINT "FK_66ade84e03c8865d3ce0c677e66"`);
        await queryRunner.query(`ALTER TABLE "secret_code" DROP CONSTRAINT "FK_31eaffc464cf1a56c15b7bba7e5"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_4548cc4a409b8651ec75f70e280"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_ec3c75d6522fc60e0ebaf58a6b7"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_e2fe567ad8d305fefc918d44f50"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_36bc604c820bb9adc4c75cd4115"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_092d4a48311d681de32cf80fc0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_96069fbdbdb77b59fbf424087c"`);
        await queryRunner.query(`DROP TABLE "users_chats"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d9f76a4b34ee9d3362513edb8c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c0ddc5f43e0f2fb14d73ee7cb3"`);
        await queryRunner.query(`DROP TABLE "post_media_files"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7f9fb03bbbea6bfad789729ead"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_082f93507aad6ee05e92abf211"`);
        await queryRunner.query(`DROP TABLE "user_friends"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_66284736af2f31f95c22d0b36c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e1846a30fd64b7721f23499d78"`);
        await queryRunner.query(`DROP TABLE "user_media_files"`);
        await queryRunner.query(`DROP TABLE "media_files"`);
        await queryRunner.query(`DROP TABLE "chats"`);
        await queryRunner.query(`DROP TABLE "secret_code"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "likes"`);
        await queryRunner.query(`DROP TABLE "messages"`);
    }

}
