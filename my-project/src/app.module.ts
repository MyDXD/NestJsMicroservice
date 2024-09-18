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
      name: 'productsDatabase', // ตั้งชื่อการเชื่อมต่อ
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'products_database', // ชื่อฐานข้อมูลสำหรับ products
      entities: [__dirname + '/entities/products/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    // การเชื่อมต่อกับฐานข้อมูล MySQL สำหรับ Category
    TypeOrmModule.forRoot({
      name: 'categoriesDatabase', // ตั้งชื่อการเชื่อมต่อ
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'categories_database', // ชื่อฐานข้อมูลสำหรับ categories
      entities: [__dirname + '/entities/categories/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    ProductsModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
