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

    if (!categoryData.name) {
      throw new Error('Name is required');
    }

    const category = this.categoryRepository.create(categoryData);

    return this.categoryRepository.save(category);
  }

  // Method สำหรับดึงข้อมูล Category ทั้งหมด
  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['products'] });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id }, relations: ['products'] });
    if (!category) {
      return null; // ส่งคืน null ถ้าไม่พบ
    }
    return category; // ส่งคืนข้อมูล category
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
