import { NewsResponse } from '@/types/news';
import { ApiError } from '@/utils/apiError';

export class NewsService {
	static async getRandomNews(): Promise<NewsResponse[]> {
		const cities = [
			'jakarta',
			'jabar',
			'mataram',
			'mataraman',
			'medan',
			'padang',
			'flores',
			'sulbar',
			'ambon',
			'wartakota',
			'bogor',
			'pantura',
			'madura',
			'palembang',
			'pekanbaru',
			'banjarmasin',
			'pontianak',
			'papua',
			'bekasi',
			'cirebon',
			'jogja',
			'bali',
			'bangka',
			'jambi',
			'kaltim',
			'palu',
			'papuabarat',
			'banten',
			'jateng',
			'jatim',
			'aceh',
			'batam',
			'sumsel',
			'kalteng',
			'makassar',
			'tangerang',
			'solo',
			'surabaya',
			'prohaba',
			'belitung',
			'lampung',
			'kaltara',
			'lombok',
			'depok',
			'banyumas',
			'suryamalang',
			'sultra',
			'babel',
			'kupang',
			'manado',
			'ternate',
		];
		const randomCity = cities[Math.floor(Math.random() * cities.length)];
		const response = await fetch(
			`https://berita-indo-api-next.vercel.app/api/tribun-news/${randomCity}/travel`
		);

		if (!response.ok) {
			throw new ApiError(500, 'Something went wrong');
		}

		const news: { data: NewsResponse[] } = await response.json();
		return news.data;
	}
}
