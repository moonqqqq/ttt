import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { FaqService } from './faq.service';
import { API_ENDPOINT, API_VERSION } from '../shared/constants/api-versions';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiOkListResponse } from '../shared/decorators/api-ok-list-res.decorator';
import { GetFaqResDTO } from './dtos/get-faq.dto';
import ResWrapper from '../shared/utils/res-wrapper.static';

@ApiTags(`${API_ENDPOINT.FAQ}`)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.FAQ}`)
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get faq list' })
  @ApiOkListResponse(GetFaqResDTO)
  async getFaqs() {
    const faqs = await this.faqService.getFaqs();
    return ResWrapper.list(faqs);
  }
}
