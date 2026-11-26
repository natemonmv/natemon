// Leave published set to false until a day should exist.
// Leave listed set to false to keep it off the main sheet. It is only at /call/<id>.
window.CALL = {
  note: 'Schedule may change. Nate will let you know.',
  people: [
    { name: 'Marty', role: 'Photographer', phone: '650-207-4346', days: ['1111', '1223'] },
    { name: 'Fiel Jamil', role: 'Videographer', phone: '650-732-6223', days: ['1111', '1223'] },
    { name: 'Reina Dawe', role: 'Officiant', phone: '650-501-9047', days: ['1111'] },
    { name: 'Beatriz Orozco', role: 'Officiant and day-of coordinator', phone: '510-509-0966', days: ['1223'] },
    { name: 'Ilana Thomas', role: 'Violinist', phone: '925-784-9611', days: ['1223'] },
    { name: 'Madeline Morales', role: 'Sister and Witness', phone: '650-534-5959', days: ['1111', '1223'] }
  ],
  days: [
    {
      id: '1111',
      published: true,
      listed: false,
      label: 'Nov 11',
      title: 'Wednesday, November 11',
      shotlist: 'https://photos.app.goo.gl/sT26dAxFkwreMzkE8',
      places: [
        {
          name: 'Filoli Historic House & Garden',
          lines: ['86 Cañada Road', 'Woodside, CA 94062'],
          note: 'Doors open at 10:00 a.m.',
          maps: 'https://www.google.com/maps/search/?api=1&query=Filoli%20Historic%20House%20%26%20Garden%2086%20Canada%20Road%20Woodside'
        }
      ],
      timeline: [
        { time: '10:00 a.m.', text: 'Doors open', detail: 'Marty leads photography. Fiel leads video with behind-the-scenes-style coverage.' },
        { time: '11:00 a.m.', text: 'Ceremony begins', detail: 'A short ceremony. Location decided on the day-of.' },
        { time: '11:11 a.m.', text: 'Pronouncement', detail: 'Pronouncement of marriage, then signing of the license. The signing location will be decided on the day. Photo coverage ends after the signing.' },
        { time: '12:00 p.m.', text: 'Video coverage ends', detail: '' }
      ]
    },
    {
      id: '1223',
      published: true,
      label: 'Dec 23',
      title: 'Wednesday, December 23',
      shotlist: 'https://photos.app.goo.gl/gyLNhim8HMSh25xN7',
      places: [
        {
          name: 'The Westin St. Francis',
          lines: ['335 Powell Street', 'San Francisco, CA 94102'],
          note: 'Photo and video begin in the room and at the bar.',
          maps: 'https://www.google.com/maps/search/?api=1&query=The%20Westin%20St.%20Francis%20335%20Powell%20Street%20San%20Francisco'
        },
        {
          name: 'San Francisco City Hall',
          lines: ['1 Dr. Carlton B. Goodlett Place', 'Fourth Floor Balcony', 'San Francisco, CA 94102'],
          note: 'Guest arrival, ceremony, and balcony photos. Ilana plays here only.',
          maps: 'https://www.google.com/maps/search/?api=1&query=San%20Francisco%20City%20Hall%201%20Dr%20Carlton%20B%20Goodlett%20Pl'
        },
        {
          name: 'Epic Steak',
          lines: ['369 The Embarcadero', 'San Francisco, CA 94105'],
          note: 'Cocktail hour on the terrace and lunch in the bay terrace. No valet parking.',
          maps: 'https://www.google.com/maps/search/?api=1&query=Epic%20Steak%20369%20The%20Embarcadero%20San%20Francisco'
        }
      ],
      timeline: [
        { time: '9:00 a.m.', text: 'Photo and video begin', detail: 'Westin St. Francis, in the room and at the bar.' },
        { time: '9:40 a.m.', text: 'Travel to City Hall', detail: '' },
        { time: '10:00 a.m.', text: 'City Hall photos and video', detail: 'Nate and Monica only.' },
        { time: '10:45 a.m.', text: 'Seating begins', detail: 'Fourth Floor Balcony. Beatriz briefs guests.' },
        { time: '11:00 a.m.', text: 'Ceremony begins', detail: 'Fourth Floor Balcony.' },
        { time: '11:25 a.m.', text: 'First dance', detail: '' },
        { time: '11:30 a.m.', text: 'Group photos', detail: 'On the balcony, with family and friends.' },
        { time: '12:00 p.m.', text: 'Travel to Epic Steak', detail: '' },
        { time: '12:30 p.m.', text: 'Bay Bridge backdrop photos', detail: 'Nate and Monica only.' },
        { time: '1:00 p.m.', text: 'Cocktail hour begins', detail: 'Candid photos and videos on the terrace with family and friends.' },
        { time: '2:00 p.m.', text: 'Lunch begins', detail: 'Bay terrace, with candid photos.' },
        { time: '3:30 p.m.', text: 'Cake cutting', detail: '' },
        { time: '4:00 p.m.', text: 'Travel to the holiday bar', detail: 'Location to be confirmed.' },
        { time: '5:00 p.m.', text: 'Holiday bar', detail: 'Candid photos and videos.' }
      ]
    }
  ]
};
