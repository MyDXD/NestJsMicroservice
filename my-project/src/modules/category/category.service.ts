import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from '../../entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async createCategory(categoryData: CreateCategoryDto): Promise<Category> {
    // ตรวจสอบว่ามีข้อมูลครบก่อนสร้าง
    if (!categoryData.name) {
      throw new Error('Name is required');
    }

    // สร้าง Category object
    const category = this.categoryRepository.create(categoryData);

    // บันทึก Category ลงในฐานข้อมูล
    return this.categoryRepository.save(category);
  }

  // Method สำหรับดึงข้อมูล Category ทั้งหมด
  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['products'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
