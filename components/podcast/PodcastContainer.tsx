
import PodcastHeader from "./PodcastHeader";
import PodcastDetails from "./PodcastDetails";
import PodcasCards from "./PodcasCards";


const PodcastContainer = () => {
    return (
        <section className="min-h-screen pt-36 pb-20 relative flex flex-col gap-3 items-center overflow-hidden">
            {/* BACKGROUND IMAGE WITH OVERLAY */}
         
            <PodcastHeader />
            <PodcastDetails />
            <PodcasCards/>
    
        </section>
    );
};

export default PodcastContainer;
