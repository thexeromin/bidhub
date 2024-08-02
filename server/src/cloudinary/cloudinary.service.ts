import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class CloudinaryService {
    constructor(
        private configService: ConfigService
    ) {}

    async uploadFile(
        folder: string,
        file: Express.Multer.File,
    ): Promise<UploadApiResponse | void> {
        //  Configuration
        cloudinary.config({
            cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
            api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
            api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
        })

        const base64String = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
        const uploadResult = await cloudinary.uploader
            .upload(base64String, {
                folder: folder,
                public_id: uuidv4(),
                resource_type: 'auto',
            })
            .catch((error) => {
                console.log(error)
            })

        return uploadResult
    }
}
