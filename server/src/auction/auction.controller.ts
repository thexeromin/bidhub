import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    FileTypeValidator,
    MaxFileSizeValidator,
    ParseFilePipe,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { AuctionService } from './auction.service'
import { CreateAuctionDto } from './dto/create-auction.dto'
import { UpdateAuctionDto } from './dto/update-auction.dto'

@Controller('auction')
export class AuctionController {
    constructor(private readonly auctionService: AuctionService) {}

    @Post()
    @UseInterceptors(FileInterceptor('photo'))
    create(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 20000 }),
                    new FileTypeValidator({ fileType: 'image/jpeg' }),
                ],
            }),
        )
        photo: Express.Multer.File,
        @Body() createAuctionDto: CreateAuctionDto
    ) {
        return this.auctionService.create(photo, createAuctionDto)
    }

    @Get()
    findAll() {
        return this.auctionService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.auctionService.findOne(id)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateAuctionDto: UpdateAuctionDto,
    ): Promise<boolean> {
        return this.auctionService.update(id, updateAuctionDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.auctionService.remove(id)
    }

    @Get('products/:id')
    findAllAuctionProducts(@Param('id') id: string) {
        return this.auctionService.getAllProducts(id)
    }
}
