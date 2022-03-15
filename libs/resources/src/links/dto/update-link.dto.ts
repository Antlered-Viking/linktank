import { PartialType } from '@nestjs/mapped-types';
import { CreateLinkDto } from './create-link.dto';

export class UpdateLinkDto extends PartialType(CreateLinkDto) {
  isRead?: boolean;
  notes?: string;
  customData?: string[];

  constructor(
    url = 'INVALID',
    tags: string[] = [],
    isRead = false,
    notes = '',
    customData: string[] = []
  ) {
    super(url, tags);
    this.isRead = isRead;
    this.notes = notes;
    this.customData = customData;
  }
}
