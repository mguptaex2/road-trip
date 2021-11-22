// import TripPlanner from "";
import dynamic from 'next/dynamic'

const TripPlanner = dynamic(() => import('../views/TripPlanner/TripPlanner'), { ssr: false });

export default TripPlanner;