import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private authService: AuthService,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    try {
      createAccountDto.password = await this.authService.hashPassword(
        createAccountDto.password,
      );
      const account = await this.accountRepository.save(createAccountDto);
      return account;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    const accounts = await this.accountRepository.find();
    return accounts;
  }

  async findOne(id: number) {
    const account = await this.accountRepository.findOneBy({ id });
    if (!account) {
      throw new NotFoundException('User not found');
    }
    return account;
  }

  async findOneByEmail(email: string) {
    try {
      const account = await this.accountRepository.findOneBy({ email });
      if (!account) {
        throw new NotFoundException('User not found');
      }
      return account;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findByIdProduct(id_product: number) {
    try {
      const result = await this.accountRepository.query(
        `
        SELECT accounts.id, accounts.name, accounts.role, accounts.email, accounts.area, COUNT(task.name) AS sumTask
        FROM accounts
        LEFT JOIN team ON accounts.id = team.id_account
        LEFT JOIN projects ON team.id_project = projects.id
        LEFT JOIN task ON task.id_account = accounts.id
        WHERE projects.id = ?
        GROUP BY accounts.id
      `,
        [id_product],
      );
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async updateStatus(id: number, updateUserDto: UpdateAccountDto) {
    try {
      const account = await this.accountRepository.findOneBy({ id });
      if (!account) {
        throw new NotFoundException('User not found');
      } else {
        const account = await this.accountRepository.update(
          { id },
          updateUserDto,
        );
        return account;
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateUserDto: UpdateAccountDto, req: any) {
    try {
      if (!req.headers.authorization) {
        throw new NotFoundException('User not found');
      }
      const user = await this.accountRepository.findOneBy({ id });
      if (req.user.role != 'admin' && req.user.id != user.id) {
        throw new InternalServerErrorException('Bạn không đủ quyền truy cập');
      }
      if (!user) {
        throw new NotFoundException('User not found');
      } else {
        if (updateUserDto.password) {
          updateUserDto.password = await this.authService.hashPassword(
            updateUserDto.password,
          );
        }
        if (typeof updateUserDto.thumb !== 'string') {
          console.log(updateUserDto.thumb);
        }
        const user = await this.accountRepository.update({ id }, updateUserDto);
        return user;
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.accountRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException('User not found');
      } else {
        const user = await this.accountRepository.delete({ id });
        return user;
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async login(createAccountDto: CreateAccountDto) {
    try {
      const { email, password } = createAccountDto;
      const user = await this.accountRepository.findOneBy({ email });
      if (!user) {
        throw new NotFoundException('user not fond');
      }
      const compare = await this.authService.comparePasswords(
        password,
        user.password,
      );

      if (!compare) {
        throw new NotFoundException('Wrong password');
      } else {
        const token = this.authService.signIn(user);
        return token;
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
