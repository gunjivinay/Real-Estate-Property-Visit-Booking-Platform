import { collection, getDocs, writeBatch, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

export const properties = [
    {
        title: "Luxury Sea View Villa",
        location: "Worli, Mumbai",
        price: 150000000,
        type: "Villa",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        description: "Experience the pinnacle of luxury in this sea-facing villa. Expansive decks, private pool, and floor-to-ceiling windows offer uninterrupted views of the Arabian Sea.",
        amenities: ["Private Pool", "Sea View", "Home Theater", "5 Bedrooms", "Servant Quarters", "Smart Home Automation"]
    },
    {
        title: "Modern Utra-Luxe Apartment",
        location: "Bandra West, Mumbai",
        price: 85000000,
        type: "Apartment",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        description: "A state-of-the-art apartment in the heart of Bandra. Featuring contemporary interiors, a modular Italian kitchen, and proximity to the city's best cafes and clubs.",
        amenities: ["Gym", "24/7 Security", "Clubhouse Access", "Italian Kitchen", "Concierge Service"]
    },
    {
        title: "Eco-Friendly Penthouse",
        location: "Whitefield, Bangalore",
        price: 45000000,
        type: "Penthouse",
        image: "https://images.unsplash.com/photo-1600596542815-e3289cab6f79?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        description: "Sustainable living meets luxury. This penthouse features a private terrace garden, solar power integration, and naturally lit spaces designed for mindfulness.",
        amenities: ["Terrace Garden", "Solar Power", "Yoga Deck", "Rainwater Harvesting", "Skylights"]
    },
    {
        title: "Colonial Style Bungalow",
        location: "Koregaon Park, Pune",
        price: 60000000,
        type: "Bungalow",
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        description: "A beautifully restored colonial bungalow set amidst lush greenery. High ceilings, teak wood flooring, and a sprawling lawn make this a heritage masterpiece.",
        amenities: ["Large Lawn", "Vintage Interiors", "Staff Quarters", "Gated Community", "3 Car Parking"]
    },
    {
        title: "High-Rise Sky Mansion",
        location: "Gachibowli, Hyderabad",
        price: 55000000,
        type: "Mansion",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        description: "Living among the clouds. This sky mansion spans two floors and offers 360-degree views of the IT hub. Complete with a private elevator and jacuzzi.",
        amenities: ["Private Elevator", "Jacuzzi", "Helipad Access", "Infinity Pool", "Sky Lounge"]
    },
    {
        title: "Minimalist Studio Loft",
        location: "Indiranagar, Bangalore",
        price: 15000000,
        type: "Apartment",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        description: "Perfect for the urban professional. A chic, open-plan studio loft with industrial accents and smart space utilization.",
        amenities: ["Open Plan", "Co-working Space", "High-speed Internet", "Rooftop Cafe", "Metro Access"]
    },
    {
        title: "Grand Farmhouse Retreat",
        location: "Chattarpur, New Delhi",
        price: 120000000,
        type: "Farmhouse",
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        description: "Escape the city chaos in this sprawling farmhouse. Acres of landscaped gardens, a private swimming pool, and banquet halls making it perfect for events.",
        amenities: ["Swimming Pool", "Banquet Hall", "Organic Garden", "Tennis Court", "10+ Acres"]
    },
    {
        title: "Lakeview Residence",
        location: "Salt Lake City, Kolkata",
        price: 35000000,
        type: "Apartment",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        description: "Serene views of the lake from every room. This residence offers peace and tranquility while being connected to the city's cultural heart.",
        amenities: ["Lake View", "Balcony", "Library", "Meditation Room", "Jogging Track"]
    },
    {
        title: "Heritage Chettinad House",
        location: "Alwarpet, Chennai",
        price: 75000000,
        type: "House",
        image: "https://images.unsplash.com/photo-1599809275372-b7f55fc2f248?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        description: "A fusion of tradition and modernity. This house features classic Chettinad architecture with Athangudi tiles and a central courtyard.",
        amenities: ["Central Courtyard", "Traditional Architecture", "Puja Room", "Teak Pillars", "Rainwater Harvesting"]
    },
    {
        title: "Seaside Vacation Home",
        location: "Candolim, Goa",
        price: 40000000,
        type: "Villa",
        image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        description: "Your perfect holiday getaway. A Portuguese-style villa just minutes away from the beach, featuring vibrant colors and a cozy vibe.",
        amenities: ["Near Beach", "Portuguese Style", "Garden", "Outdoor Bar", "Hammocks"]
    },
    {
        title: "Tech-Enabled Smart Villa",
        location: "Electronic City, Bangalore",
        price: 32000000,
        type: "Villa",
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        description: "Future-ready living. Control lighting, temperature, and security with your voice. Designed for the modern tech enthusiast.",
        amenities: ["Full Automation", "EV Charging", "Fiber Optic", "Gaming Room", "Solar Roof"]
    },
    {
        title: "Opulent Palace Suite",
        location: "Civil Lines, Jaipur",
        price: 95000000,
        type: "Mansion",
        image: "https://images.unsplash.com/photo-1505577058444-a3fab90d92b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        description: "Live like royalty. Intricate sandstone carvings, jharokhas, and expansive courtyards define this architectural marvel in the Pink City.",
        amenities: ["Sandstone Architecture", "Large Courtyard", "Fountain", "Heritage Zone", "Home Spa"]
    }
];

export const seedProperties = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "properties"));
        console.log("Checking properties collection for update...");

        // Simple check: if less than 12 docs OR we want to force update (let's force update for now to fix user issue)
        // We will clear the collection first to remove bad data (strings etc)

        let shouldSeed = false;
        if (querySnapshot.empty) {
            shouldSeed = true;
        } else {
            // Check if first doc has valid number price. If not, we nuke it.
            const firstData = querySnapshot.docs[0].data();
            if (typeof firstData.price !== 'number') {
                console.log("Detected old data format. Re-seeding...");
                shouldSeed = true;

                // Delete all existing docs
                const deleteBatch = writeBatch(db);
                querySnapshot.docs.forEach((doc) => {
                    deleteBatch.delete(doc.ref);
                });
                await deleteBatch.commit();
                console.log("Old data cleared.");
            }
        }

        if (shouldSeed) {
            console.log("Seeding new premium properties...");
            const batch = writeBatch(db);
            properties.forEach(property => {
                const docRef = doc(collection(db, "properties"));
                batch.set(docRef, property);
            });
            await batch.commit();
            console.log("Properties seeded successfully!");
        } else {
            console.log("Properties data is up to date.");
        }
    } catch (error) {
        console.error("Error seeding properties: ", error);
    }
};
