import { ConnectionOptions } from "typeorm";

const config : ConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database:"my-discout",
    // entities: [TagEntity,UserEntity,ArticleEntity,FollowEntity],
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
};

export default config;