import { Itinerary } from '@/types/plan';
import { getAxiosInstance, handleAxiosError } from '../axios';

export const dummyItinerary: Itinerary = {
	day1: [
		{
			placeName: 'Kuta Beach',
			description:
				'Start your day with a relaxing morning at Kuta Beach. Watch the sunrise, take a stroll along the sandy shores, or try surfing with one of the many instructors available for beginners.',
			time: '06:00 - 09:00',
			address: 'Jl. Pantai Kuta, Kuta, Badung, Bali',
			cost: 'Rp 100.000 - 200.000',
			category: 'Beach',
			distance: '0.5 km from hotel',
		},
		{
			placeName: 'Beachwalk Shopping Center',
			description:
				'Head to Beachwalk for breakfast and shopping. This open-air mall has numerous cafes and restaurants with beautiful views of the ocean.',
			time: '09:30 - 11:30',
			address: 'Jl. Pantai Kuta, Kuta, Badung, Bali 80361',
			cost: 'Rp 150.000 - 300.000',
			category: 'Shopping',
			distance: '1.2 km from previous location',
		},
		{
			placeName: 'Uluwatu Temple',
			description:
				'Visit this spectacular temple perched on a steep cliff 70 meters above the sea. Arrive before sunset to witness the famous Kecak dance performance.',
			time: '14:00 - 18:00',
			address: 'Pecatu, South Kuta, Badung Regency, Bali',
			cost: 'Rp 50.000 entrance + Rp 100.000 for dance show',
			category: 'Cultural',
			distance: '21 km from previous location',
		},
		{
			placeName: 'Jimbaran Bay Seafood',
			description:
				'Enjoy a romantic seafood dinner on the beach with your toes in the sand as you watch the sunset. Choose from multiple seafood cafes lined up along the bay.',
			time: '18:30 - 21:00',
			address: 'Jimbaran Beach, Jimbaran, South Kuta, Badung Regency',
			cost: 'Rp 300.000 - 500.000 per person',
			category: 'Dining',
			distance: '7 km from previous location',
		},
	],
	day2: [
		{
			placeName: 'Ubud Monkey Forest',
			description:
				'Explore this natural sanctuary with over 700 monkeys roaming freely. The forest also contains ancient temples and is considered a spiritual place by locals.',
			time: '09:00 - 11:00',
			address: 'Jl. Monkey Forest, Ubud, Gianyar, Bali 80571',
			cost: 'Rp 80.000 per person',
			category: 'Nature',
			distance: '35 km from hotel',
		},
		{
			placeName: 'Tegallalang Rice Terraces',
			description:
				'Visit these stunning terraced rice fields that showcase the traditional Balinese irrigation system known as subak. Perfect for photography enthusiasts.',
			time: '11:30 - 13:30',
			address: 'Tegallalang, Gianyar, Bali',
			cost: 'Rp 15.000 donation suggested',
			category: 'Nature',
			distance: '9 km from previous location',
		},
		{
			placeName: 'Goa Gajah (Elephant Cave)',
			description:
				'Explore this archaeological site dating back to the 9th century. The cave entrance is carved with menacing creatures and demons.',
			time: '14:00 - 15:30',
			address: 'Bedulu, Blahbatuh, Gianyar, Bali',
			cost: 'Rp 50.000 per person',
			category: 'Historical',
			distance: '15 km from previous location',
		},
		{
			placeName: 'Ubud Art Market',
			description:
				"Shop for handmade crafts, artwork, jewelry, and souvenirs at this traditional market. Don't forget to practice your bargaining skills!",
			time: '16:00 - 18:00',
			address: 'Jl. Raya Ubud, Ubud, Gianyar, Bali',
			cost: 'Depends on purchases',
			category: 'Shopping',
			distance: '13 km from previous location',
		},
		{
			placeName: 'Bebek Bengil (Dirty Duck Diner)',
			description:
				"Try Bali's famous crispy duck at this iconic restaurant surrounded by rice paddies. The restaurant has a beautiful outdoor garden setting.",
			time: '19:00 - 21:00',
			address: 'Jl. Hanoman, Padang Tegal, Ubud, Gianyar, Bali',
			cost: 'Rp 150.000 - 250.000 per person',
			category: 'Dining',
			distance: '2 km from previous location',
		},
	],
	day3: [
		{
			placeName: 'Tanah Lot Temple',
			description:
				'Visit this iconic sea temple built on a rock formation in the ocean. One of the most photographed spots in Bali, especially beautiful during sunset.',
			time: '07:00 - 09:30',
			address: 'Beraban, Kediri, Tabanan, Bali',
			cost: 'Rp 60.000 per person',
			category: 'Cultural',
			distance: '22 km from hotel',
		},
		{
			placeName: 'Bali Butterfly Park',
			description:
				'Walk among hundreds of butterflies in this enclosed garden. The park also features a variety of insects and reptiles.',
			time: '10:30 - 12:00',
			address: 'Jl. Batukaru, Tabanan, Bali',
			cost: 'Rp 100.000 per person',
			category: 'Nature',
			distance: '15 km from previous location',
		},
		{
			placeName: 'Jatiluwih Rice Terraces',
			description:
				'Explore these UNESCO-listed rice terraces that cover over 600 hectares. Less crowded than Tegallalang and offering more extensive hiking opportunities.',
			time: '13:00 - 15:30',
			address: 'Jatiluwih, Penebel, Tabanan, Bali',
			cost: 'Rp 40.000 per person',
			category: 'Nature',
			distance: '18 km from previous location',
		},
		{
			placeName: 'Alas Kedaton Monkey Forest',
			description:
				'Visit this forest temple inhabited by nutmeg trees and hundreds of monkeys and flying foxes. Less touristy than the Ubud Monkey Forest.',
			time: '16:00 - 17:30',
			address: 'Kukuh, Marga, Tabanan, Bali',
			cost: 'Rp 30.000 per person',
			category: 'Nature',
			distance: '14 km from previous location',
		},
		{
			placeName: 'Menega Cafe',
			description:
				'Return to Jimbaran Bay for another seafood dinner, this time at one of the most popular cafes known for its fresh catches and special sauces.',
			time: '19:00 - 21:00',
			address: 'Jl. Four Seasons, Muaya Beach, Jimbaran, Bali',
			cost: 'Rp 300.000 - 500.000 per person',
			category: 'Dining',
			distance: '30 km from previous location',
		},
	],
	day4: [
		{
			placeName: 'Mount Batur Sunrise Trekking',
			description:
				"Experience an early morning hike up an active volcano to watch the sunrise above the clouds. Guides will prepare breakfast with eggs cooked using the volcano's steam.",
			time: '02:00 - 10:00',
			address: 'Mount Batur, Kintamani, Bangli, Bali',
			cost: 'Rp 350.000 - 500.000 per person',
			category: 'Adventure',
			distance: '40 km from hotel',
		},
		{
			placeName: 'Toya Devasya Hot Springs',
			description:
				'Relax your muscles after the hike in natural hot springs with views of Lake Batur and Mount Batur volcano.',
			time: '10:30 - 12:30',
			address: 'Jl. Raya Pekutatan, Batur Tengah, Kintamani, Bali',
			cost: 'Rp 200.000 per person',
			category: 'Wellness',
			distance: '5 km from previous location',
		},
		{
			placeName: 'Kintamani Village',
			description:
				'Have lunch in this highland village offering spectacular views of Mount Batur and its lake. Try local coffee and traditional Balinese dishes.',
			time: '13:00 - 14:30',
			address: 'Kintamani, Bangli, Bali',
			cost: 'Rp 100.000 - 150.000 per person',
			category: 'Dining',
			distance: '3 km from previous location',
		},
		{
			placeName: 'Tirta Empul Temple',
			description:
				'Visit this water temple known for its holy spring water where Balinese Hindus go for ritual purification. You can participate in the cleansing ritual if desired.',
			time: '15:30 - 17:00',
			address: 'Jl. Tirta, Manukaya, Tampaksiring, Gianyar, Bali',
			cost: 'Rp 50.000 per person',
			category: 'Cultural',
			distance: '25 km from previous location',
		},
		{
			placeName: 'Bebek Tepi Sawah',
			description:
				'Enjoy dinner at this restaurant specializing in crispy duck with views of rice fields. The beautiful setting includes traditional Balinese architecture.',
			time: '18:30 - 20:30',
			address: 'Jl. Raya Goa Gajah, Peliatan, Ubud, Bali',
			cost: 'Rp 150.000 - 250.000 per person',
			category: 'Dining',
			distance: '15 km from previous location',
		},
	],
	day5: [
		{
			placeName: 'Nusa Penida Island Day Trip',
			description:
				"Take a speedboat to this gorgeous island off Bali's coast. Visit the famous Kelingking Beach (T-Rex shaped cliff), Angel's Billabong, and Broken Beach.",
			time: '07:00 - 18:00',
			address: 'Nusa Penida Island (departure from Sanur Beach)',
			cost: 'Rp 850.000 - 1.200.000 per person',
			category: 'Adventure',
			distance: '40 km from hotel to Sanur Harbor',
		},
		{
			placeName: 'Ku De Ta Beach Club',
			description:
				"End your trip with dinner and drinks at one of Seminyak's most famous beach clubs. Enjoy the sunset, sophisticated ambiance, and international cuisine.",
			time: '19:00 - 22:00',
			address: 'Jl. Kayu Aya No.9, Seminyak, Bali',
			cost: 'Rp 500.000 - 800.000 per person',
			category: 'Dining',
			distance: '15 km from Sanur Harbor',
		},
	],
};

export const fetchItinerary = async (planId: string) => {
	try {
		const axios = getAxiosInstance();
		const { data } = await axios.get(`/plans/${planId}/itinerary`);
		const itinerary: Itinerary = data.data;
		return itinerary;
	} catch (error) {
		handleAxiosError(error, 'fetchItinerary');
	}
};

export const saveItineraryToPlan = async (planId: string, body: Itinerary) => {
	try {
		const axios = getAxiosInstance();
		const { data } = await axios.post(`/plans/${planId}/itinerary`, {
			body: {
				result: body,
			},
		});
		const itinerary: Itinerary = data;
		return itinerary;
	} catch (error) {
		handleAxiosError(error, 'saveItinerary');
	}
};
