import Carousel from './components/Carousel3';
import Navigation from './components/Navigation';

export default function App() {
  const images = [
    { 
      src: '/images/01/img1.jpg',
      title: 'Hatch Coffee Table',
      description: 'A stylish and functional piece suitable for any modern living space.'
    },
    { 
      src: '/images/02/img1.jpg',
      title: 'Rook Stool',
      description: 'A versatile stool that complements a variety of interior styles.'
    },
    { 
      src: '/images/03/img1.jpg',
      title: 'Trace Table Lamp',
      description: 'A sleek lamp that provides both illumination and aesthetic appeal.'
    },
    { 
      src: '/images/04/img1.jpg',
      title: 'Lounger Chair',
      description: 'A comfortable chair designed for relaxation and style.'
    },
    {
      src: '/images/05/img1.jpg',
      title: 'Buoy Couch',
      description: 'A plush couch offering the perfect blend of comfort and elegance for any living room.'
    },
    { 
      src: '/images/04/img1.jpg',
      title: 'Lounger Chair',
      description: 'A comfortable chair designed for relaxation and style.'
    },
    {
      src: '/images/05/img1.jpg',
      title: 'Buoy Couch',
      description: 'A plush couch offering the perfect blend of comfort and elegance for any living room.'
    }
  ];

  return (
    <div className="h-screen overflow-hidden">
      <Navigation />
      <div>
        <Carousel images={images} />
      </div>
    </div>
  );
}
