import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from '../../entities/category.entity';
import { Repository } from 'typeorm';
import { response } from 'express';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(categoryData: CreateCategoryDto): Promise<Category> {
    try {
      const category = this.categoryRepository.create(categoryData);
      this.categoryRepository.save(category);
      return category;
    } catch (error) {
      return error;
    }
  }

  // Method สำหรับดึงข้อมูล Category ทั้งหมด
  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['products'] });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!category) {
      return null; // ส่งคืน null ถ้าไม่พบ
    }
    return category; // ส่งคืนข้อมูล category
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.categoryRepository.update(id, updateCategoryDto);
    return await this.categoryRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
