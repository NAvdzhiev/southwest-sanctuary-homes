<template>
    <HeroSection/>
    <ContentContainer 
    heading="Your Dreams Our Expretise" 
    text="Welcome to Southwest Sanctuary Homes, 
    where your dreams of finding the perfect home come to life through our unparalleled expertise. 
    Nestled in the heart of the Southwest, our dedicated team specializes in real estate and interior design, 
    blending modern comfort with the timeless beauty of the desert. 
    We understand that a home is more than just a place to live; 
    it's a sanctuary that reflects your style and aspirations. 
    From discovering stunning properties to crafting bespoke interiors, 
    we are committed to guiding you every step of the way. 
    Trust us to transform your vision into reality and create a space where you can truly thrive."
    buttonText="Learn More!"
    buttonLink="/"
    imageSrc="welcome-section.jpg"
    />

    <PropertyCard imageSrc="listing-01.jpg" title="Arizona Desert Sanctuary" bedrooms="4" bathrooms="2" footage="3246" price="1,250,000" id="5"/>

    <ContentContainer 
    heading="Let your vision Inspire our design" 
    text="At Southwest Sanctuary Homes, we believe your home should reflect your unique style. 
    Our expert interior design team is dedicated to transforming your vision into reality, 
    whether it's a cozy desert retreat or a modern adobe masterpiece. 
    With a deep understanding of Southwest aesthetics, we ensure every detail is tailored to your taste, 
    from selecting color palettes to curating bespoke furniture. Let your vision inspire our design, 
    and together we'll create a home that is truly your sanctuary. 
    Explore our design services to see how we can make your dream home a reality."
    buttonText="Take our style quiz"
    buttonLink="/"
    imageSrc="design-intro-section-01.jpg"
    reverse
    />
</template>

<script setup>
import HeroSection from '@/components/ui/HeroSection.vue';
import ContentContainer from '@/components/ui/ContentContainer.vue';
import PropertyCard from '@/components/ui/PropertyCard.vue';

</script>