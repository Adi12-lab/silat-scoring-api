import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { KegiatanModule } from './kegiatan/kegiatan.module';
import { PesertaModule } from './peserta/peserta.module';
import { PertandinganModule } from './pertandingan/pertandingan.module';
import { EventModule } from './event/event.module';
import { BabakModule } from './babak/babak.module';
import { KategoriModule } from './kategori/kategori.module';
import { KelasModule } from './kelas/kelas.module';

@Module({
  imports: [UserModule, AuthModule, KegiatanModule, PesertaModule, PertandinganModule, EventModule, BabakModule, KategoriModule, KelasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
