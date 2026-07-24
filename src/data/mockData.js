export const initialUserData = {
  name: "Alex Morgan",
  email: "alex.morgan@voyger.com",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
  coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1600",
  membership: "VIP Platinum Traveler",
  rewardPoints: 48500,
  tierLevel: "Platinum",
  tripsCompleted: 24,
  countriesVisitedCount: 18,
  citiesExploredCount: 42,
  moneySpent: 18450,
  bio: "Luxury travel enthusiast, coffee connoisseur & landscape photographer exploring hidden gems worldwide.",
  countriesVisitedList: [
    { name: "Greece", flag: "🇬🇷", code: "GR" },
    { name: "Japan", flag: "🇯🇵", code: "JP" },
    { name: "Italy", flag: "🇮🇹", code: "IT" },
    { name: "France", flag: "🇫🇷", code: "FR" },
    { name: "Switzerland", flag: "🇨🇭", code: "CH" },
    { name: "Maldives", flag: "🇲🇻", code: "MV" },
    { name: "Canada", flag: "🇨🇦", code: "CA" },
    { name: "Iceland", flag: "🇮🇸", code: "IS" },
    { name: "Spain", flag: "🇪🇸", code: "ES" },
    { name: "Thailand", flag: "🇹🇭", code: "TH" },
    { name: "Indonesia", flag: "🇮🇩", code: "ID" },
    { name: "United Kingdom", flag: "🇬🇧", code: "GB" },
    { name: "United States", flag: "🇺🇸", code: "US" },
    { name: "Jordan", flag: "🇯🇴", code: "JO" },
  ]
};

export const overviewStats = [
  {
    id: 'total-trips',
    title: 'Total Trips',
    value: '24',
    growth: '+12% vs last year',
    isPositive: true,
    icon: 'Compass',
    gradient: 'from-cyan-500/20 to-blue-600/20 border-cyan-500/30',
    iconColor: 'text-cyan-400',
    glowColor: 'shadow-glow-cyan'
  },
  {
    id: 'upcoming-trips',
    title: 'Upcoming Trips',
    value: '3',
    growth: '2 confirmed, 1 pending',
    isPositive: true,
    icon: 'Calendar',
    gradient: 'from-blue-500/20 to-indigo-600/20 border-blue-500/30',
    iconColor: 'text-blue-400',
    glowColor: 'shadow-glow-blue'
  },
  {
    id: 'countries-visited',
    title: 'Countries Visited',
    value: '18',
    growth: '+3 new this year',
    isPositive: true,
    icon: 'Globe',
    gradient: 'from-emerald-500/20 to-teal-600/20 border-emerald-500/30',
    iconColor: 'text-emerald-400',
    glowColor: 'shadow-emerald-500/20'
  },
  {
    id: 'cities-explored',
    title: 'Cities Explored',
    value: '42',
    growth: '+5 new locations',
    isPositive: true,
    icon: 'MapPin',
    gradient: 'from-purple-500/20 to-pink-600/20 border-purple-500/30',
    iconColor: 'text-purple-400',
    glowColor: 'shadow-purple-500/20'
  },
  {
    id: 'total-spent',
    title: 'Total Spent',
    value: '$18,450',
    growth: '8.4% under budget',
    isPositive: true,
    icon: 'DollarSign',
    gradient: 'from-amber-500/20 to-orange-600/20 border-amber-500/30',
    iconColor: 'text-amber-400',
    glowColor: 'shadow-amber-500/20'
  },
  {
    id: 'reward-points',
    title: 'Reward Points',
    value: '48,500',
    growth: '+2,400 pts earned',
    isPositive: true,
    icon: 'Award',
    gradient: 'from-cyan-400/20 to-emerald-500/20 border-cyan-400/30',
    iconColor: 'text-cyan-300',
    glowColor: 'shadow-cyan-400/20'
  }
];

export const upcomingTripData = {
  destination: "Santorini, Greece",
  country: "Greece",
  flag: "🇬🇷",
  image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1200",
  startDate: "Aug 15, 2026",
  endDate: "Aug 25, 2026",
  duration: "10 Days / 9 Nights",
  travelers: "2 Adults",
  hotelName: "Luxury Caldera Suites & Spa",
  hotelRoom: "Sunset Ocean View Villa",
  flightNumber: "VY-8420 (Swiss Air)",
  seat: "12A & 12B (First Class)",
  daysLeft: 15,
  hoursLeft: 8,
  status: "Confirmed",
  weather: "29°C Sunny",
  itinerary: [
    { day: "Day 1", title: "Arrival & Sunset Welcome Dinner at Oia", time: "18:30" },
    { day: "Day 2", title: "Catamaran Cruise around Red Beach & Hot Springs", time: "10:00" },
    { day: "Day 3", title: "Private Wine Tasting Tour in Megalochori", time: "15:00" },
    { day: "Day 4", title: "Fira to Oia Cliffside Hiking Experience", time: "08:30" },
    { day: "Day 5", title: "Helicopter Flight over Santorini Volcano", time: "11:00" }
  ]
};

export const initialBookings = [
  {
    id: "BK-9021",
    destination: "Santorini, Greece",
    flag: "🇬🇷",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=200",
    hotel: "Luxury Caldera Suites",
    flight: "Swiss Air VY-8420",
    bookingDate: "2026-07-10",
    travelDate: "Aug 15 - Aug 25, 2026",
    status: "Confirmed",
    price: "$3,450"
  },
  {
    id: "BK-8842",
    destination: "Kyoto, Japan",
    flag: "🇯🇵",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=200",
    hotel: "Hoshinoya Ryokan Kyoto",
    flight: "Japan Airlines JL-722",
    bookingDate: "2026-07-18",
    travelDate: "Oct 10 - Oct 20, 2026",
    status: "Confirmed",
    price: "$4,200"
  },
  {
    id: "BK-7610",
    destination: "Amalfi Coast, Italy",
    flag: "🇮🇹",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=200",
    hotel: "Le Sirenuse Positano",
    flight: "ITA Airways AZ-610",
    bookingDate: "2026-07-22",
    travelDate: "Dec 01 - Dec 08, 2026",
    status: "Pending",
    price: "$2,890"
  },
  {
    id: "BK-6503",
    destination: "Swiss Alps, Switzerland",
    flag: "🇨🇭",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=200",
    hotel: "The Chedi Andermatt",
    flight: "Swiss Air LX-38",
    bookingDate: "2026-06-15",
    travelDate: "Jan 10 - Jan 18, 2027",
    status: "Confirmed",
    price: "$5,100"
  },
  {
    id: "BK-5190",
    destination: "Bali, Indonesia",
    flag: "🇮🇩",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=200",
    hotel: "Viceroy Bali Resort",
    flight: "Singapore Air SQ-940",
    bookingDate: "2026-05-02",
    travelDate: "Jun 01 - Jun 10, 2026",
    status: "Cancelled",
    price: "$2,150"
  }
];

export const savedDestinationsData = [
  {
    id: "dest-1",
    name: "Kyoto",
    country: "Japan",
    flag: "🇯🇵",
    rating: 4.9,
    reviews: 1420,
    cost: "$2,400",
    season: "Autumn / Cherry Blossom",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800",
    isWishlisted: true,
    description: "Experience ancient temples, serene bamboo groves, and traditional tea ceremonies in Japan's cultural heart."
  },
  {
    id: "dest-2",
    name: "Amalfi Coast",
    country: "Italy",
    flag: "🇮🇹",
    rating: 4.85,
    reviews: 980,
    cost: "$2,950",
    season: "May - September",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800",
    isWishlisted: true,
    description: "Cliffside colorful villages, azure Tyrrhenian waters, and exquisite Mediterranean coastal gastronomy."
  },
  {
    id: "dest-3",
    name: "Zermatt & Matterhorn",
    country: "Switzerland",
    flag: "🇨🇭",
    rating: 4.95,
    reviews: 840,
    cost: "$3,600",
    season: "Winter & Summer Hiking",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800",
    isWishlisted: true,
    description: "Iconic alpine peaks, car-free alpine village luxury, world-class skiing, and glacier train journeys."
  },
  {
    id: "dest-4",
    name: "Baa Atoll",
    country: "Maldives",
    flag: "🇲🇻",
    rating: 4.98,
    reviews: 1150,
    cost: "$4,500",
    season: "November - April",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800",
    isWishlisted: true,
    description: "Overwater bungalows, UNESCO Biosphere manta ray swimming, and crystal turquoise lagoons."
  },
  {
    id: "dest-5",
    name: "Petra & Wadi Rum",
    country: "Jordan",
    flag: "🇯🇴",
    rating: 4.8,
    reviews: 620,
    cost: "$1,850",
    season: "Spring & Autumn",
    image: "https://images.unsplash.com/photo-1579606032821-39572714a601?auto=format&fit=crop&q=80&w=800",
    isWishlisted: true,
    description: "Carved rose-red ancient city, desert stargazing in luxury domes, and rich Bedouin hospitality."
  },
  {
    id: "dest-6",
    name: "Banff National Park",
    country: "Canada",
    flag: "🇨🇦",
    rating: 4.92,
    reviews: 1890,
    cost: "$2,200",
    season: "June - September",
    image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=800",
    isWishlisted: true,
    description: "Turquoise glacial lakes (Lake Louise & Moraine Lake), majestic Rocky Mountain wildlife and scenic drives."
  }
];

export const budgetTrackerData = {
  totalBudget: 12000,
  spentAmount: 7450,
  remainingBudget: 4550,
  spentPercentage: 62,
  categories: [
    { name: "Flights & Airfare", amount: 2850, percentage: 38, color: "#00BCD4" },
    { name: "Hotels & Resorts", amount: 3100, percentage: 42, color: "#0288D1" },
    { name: "Dining & Gourmet", amount: 900, percentage: 12, color: "#10B981" },
    { name: "Activities & Excursions", amount: 600, percentage: 8, color: "#F59E0B" }
  ],
  monthlySpending: [
    { month: "Jan", flights: 800, hotels: 950, dining: 300, total: 2050 },
    { month: "Feb", flights: 400, hotels: 600, dining: 200, total: 1200 },
    { month: "Mar", flights: 1200, hotels: 1400, dining: 450, total: 3050 },
    { month: "Apr", flights: 300, hotels: 500, dining: 250, total: 1050 },
    { month: "May", flights: 950, hotels: 1100, dining: 400, total: 2450 },
    { month: "Jun", flights: 650, hotels: 800, dining: 350, total: 1800 },
    { month: "Jul", flights: 1100, hotels: 1350, dining: 500, total: 2950 }
  ]
};

export const activityTimelineData = [
  {
    id: "act-1",
    type: "flight",
    title: "Flight Booked - VY-8420",
    details: "First Class return ticket to Santorini (JTR) via Swiss Air.",
    timestamp: "2 hours ago",
    date: "Jul 24, 2026",
    status: "Completed",
    icon: "Plane"
  },
  {
    id: "act-2",
    type: "hotel",
    title: "Hotel Reserved - Caldera Suites",
    details: "Sunset Villa reserved for 9 nights with complimentary breakfast.",
    timestamp: "Yesterday",
    date: "Jul 23, 2026",
    status: "Confirmed",
    icon: "Building"
  },
  {
    id: "act-3",
    type: "visa",
    title: "Schengen Visa Approved",
    details: "Multi-entry 3-year European travel clearance validated by Embassy.",
    timestamp: "3 days ago",
    date: "Jul 21, 2026",
    status: "Approved",
    icon: "ShieldCheck"
  },
  {
    id: "act-4",
    type: "saved",
    title: "Destination Saved - Kyoto",
    details: "Added Hoshinoya Ryokan & Arashiyama Bamboo Forest to autumn wishlist.",
    timestamp: "5 days ago",
    date: "Jul 19, 2026",
    status: "Saved",
    icon: "Heart"
  },
  {
    id: "act-5",
    type: "review",
    title: "Review Submitted - Hotel Plaza Athénée",
    details: "Left a 5-star review for stay in Paris, France.",
    timestamp: "1 week ago",
    date: "Jul 17, 2026",
    status: "Published",
    icon: "Star"
  }
];

export const recommendedDestinations = [
  {
    id: "rec-1",
    name: "Reykjavík & Blue Lagoon",
    country: "Iceland",
    flag: "🇮🇸",
    rating: 4.93,
    price: "$2,100",
    tag: "Northern Lights",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "rec-2",
    name: "Queenstown Adventure",
    country: "New Zealand",
    flag: "🇳🇿",
    rating: 4.96,
    price: "$2,750",
    tag: "Scenery & Fjords",
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "rec-3",
    name: "Cape Town Coast & Vineyards",
    country: "South Africa",
    flag: "🇿🇦",
    rating: 4.88,
    price: "$1,950",
    tag: "Safari & Wine",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "rec-4",
    name: "Machu Picchu & Cusco",
    country: "Peru",
    flag: "🇵🇪",
    rating: 4.91,
    price: "$1,820",
    tag: "Wonder of the World",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&q=80&w=600"
  }
];

export const initialNotifications = [
  {
    id: "notif-1",
    title: "Flight Check-In Open",
    message: "Swiss Air flight VY-8420 check-in opens in 24 hours. Select your preferred seat.",
    time: "10 mins ago",
    type: "flight",
    read: false,
    badge: "Urgent"
  },
  {
    id: "notif-2",
    title: "Hotel Check-in Reminder",
    message: "Luxury Caldera Suites in Santorini confirmed for Aug 15. Check-in starts at 14:00.",
    time: "2 hours ago",
    type: "hotel",
    read: false,
    badge: "Info"
  },
  {
    id: "notif-3",
    title: "Exclusive 30% Travel Discount",
    message: "Special summer discount available for Kyoto Ryokans! Valid for bookings made this week.",
    time: "5 hours ago",
    type: "discount",
    read: false,
    badge: "Promo"
  },
  {
    id: "notif-4",
    title: "Santorini Weather Forecast",
    message: "Warm sunny skies expected with average temperatures of 28°C during your trip.",
    time: "1 day ago",
    type: "weather",
    read: true,
    badge: "Weather"
  },
  {
    id: "notif-5",
    title: "New Destination Recommendation",
    message: "Based on your love for coastal cliffs, check out the Amalfi Coast luxury guide.",
    time: "2 days ago",
    type: "recommendation",
    read: true,
    badge: "Explore"
  }
];

export const travelHistoryData = [
  {
    id: "hist-1",
    destination: "Paris & French Riviera",
    country: "France",
    flag: "🇫🇷",
    date: "May 10 - May 20, 2025",
    duration: "10 Days",
    cost: "$3,850",
    rating: 5,
    highlights: ["Eiffel Tower Private Dinner", "Monaco Coast Cruise", "Louvre Guided Tour"],
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "hist-2",
    destination: "Tokyo & Mount Fuji",
    country: "Japan",
    flag: "🇯🇵",
    date: "Nov 01 - Nov 12, 2024",
    duration: "12 Days",
    cost: "$4,100",
    rating: 5,
    highlights: ["Shinkansen Bullet Train", "Fuji Onsen Resort", "Shibuya Sky Night"],
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "hist-3",
    destination: "New York City Luxury",
    country: "United States",
    flag: "🇺🇸",
    date: "Sep 14 - Sep 19, 2024",
    duration: "5 Days",
    cost: "$2,900",
    rating: 4.8,
    highlights: ["Broadway Show Box", "Central Park Helicopter Tour", "The Plaza Hotel"],
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "hist-4",
    destination: "Ubud & Seminyak",
    country: "Indonesia",
    flag: "🇮🇩",
    date: "Mar 05 - Mar 15, 2024",
    duration: "10 Days",
    cost: "$2,300",
    rating: 4.9,
    highlights: ["Floating Villa Breakfast", "Sacred Monkey Forest", "Nusa Penida Boat Trip"],
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600"
  }
];
