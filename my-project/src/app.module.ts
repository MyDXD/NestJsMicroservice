import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './modules/products/products.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    // การเชื่อมต่อกับฐานข้อมูล MySQL สำหรับ Products
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestjs_crud', // ชื่อฐานข้อมูลสำหรับ products
      entities: [__dirname + '/entities/*.entity{.ts,.js}'], // แก้ไขเส้นทางของ entity
      synchronize: true,
    }),

    // การเชื่อมต่อกับฐานข้อมูล MySQL สำหรับ Category
    // TypeOrmModule.forRoot({
    //   name: 'categoriesDatabase', // ตั้งชื่อการเชื่อมต่อ
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: '',
    //   database: 'categories_database', // ชื่อฐานข้อมูลสำหรับ categories
    //   entities: [__dirname + '/entities/*.entity{.ts,.js}'], // แก้ไขเส้นทางของ entity
    //   synchronize: true,
    // }),
    UsersModule,
    ProductsModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
