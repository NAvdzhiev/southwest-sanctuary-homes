<template>
	<section class="property-list__intro">
		<ContentContainer imageSrc="listings-intro-image.jpg">
			<h2>Home Listings</h2>
			<h3><span>Let's find your dream home</span></h3>
			<p class="regular">
				Welcome to Southwest Sanctuary Homes' listings page, where you can
				explore our diverse selection of properties across the stunning
				Southwest region. From modern condos and cozy family homes to luxurious
				estates, our portfolio offers something for every taste and need. Each
				listing features high-quality photos, detailed descriptions, and
				essential information to help you make an informed decision. Our
				inventory is updated regularly, ensuring you have access to the latest
				and most desirable homes on the market. If you see a property that
				interests you, don't hesitate to contact us. Our dedicated team is here
				to answer your questions, schedule tours, and provide additional
				details. Listings move fast around here, and we don't want you to miss
				your perfect home. Happy house hunting!
			</p>
		</ContentContainer>
	</section>
	<section class="active-listings">
		<h1>Active Listings</h1>
		<div class="listings-tools">
			<SortButton />
			<AppFilter />
		</div>
		<PropertyCardContainer>
			<PropertyCard
				v-for="property in properties"
				:key="property._id"
				:id="property._id"
				:title="property.title"
				:imageUrl="setTitleImage(property.images)"
				:bedrooms="property.bedrooms"
				:bathrooms="property.bathrooms"
				:footage="property.footage"
				:price="property.price"
			/>
		</PropertyCardContainer>
		<AppPagination />
	</section>
	<section class="property-list__trends">
		<ContentContainer imageSrc="market-trends-img.jpg" reverse>
			<h2>Current Market</h2>
			<h2><span>Trends</span></h2>
			<p class="regular">
				The real estate market in the Southwest region is experiencing dynamic
				growth, characterized by increased demand and competitive pricing.
				Various areas within this region are seeing a surge in interest from
				buyers seeking diverse property options, from urban condos to sprawling
				suburban homes. The unique blend of natural beauty, cultural richness,
				and economic opportunity continues to attract new residents and
				investors to the Southwest.
			</p>
			<br />
			<strong>Key market trends include:</strong>
			<br />
			<br />
			<ul>
				<li>
					<strong>Increased Demand for Modern Amenities:</strong>
					Homes with open floor plans, energy-efficient features, and outdoor
					living spaces are highly sought after, combining modern convenience
					with Southwest charm.
				</li>
				<li>
					<strong>Rising Interest in Luxury Properties:</strong>The strong
					economic performance and ongoing development projects in the region
					are driving a growing interest in high-end real estate and investment
					opportunities.
				</li>
				<li>
					<strong>Impact of Remote Work: </strong>The shift towards remote work
					has led to higher demand for properties with dedicated office spaces,
					high-speed internet, and proximity to recreational activities.
				</li>
				<li>
					<strong>Suburban and Rural Appeal:</strong>There is an increased
					interest in suburban and rural properties as buyers look for more
					space, a higher quality of life, and a better work-life balance.
				</li>
				<li>
					<strong>Competitive Market Conditions:</strong> With properties moving
					quickly, buyers need to stay informed and act fast to secure their
					desired homes.
				</li>
			</ul>
		</ContentContainer>
	</section>
	<section class="property-list__types">
		<div class="property-types__row-1">
			<ContentContainer imageSrc="urban-condo.jpg" reverse>
				<h4>
					Urban <br />
					Condos
				</h4>
				<p class="small">
					Ideal for those seeking a vibrant city lifestyle, urban condos offer
					modern amenities, convenient locations, and a low-maintenance living
					experience.
				</p>
			</ContentContainer>
			<ContentContainer imageSrc="market-trends-img.jpg" reverse>
				<h4>
					Suburban <br />
					Homes
				</h4>
				<p class="small">
					Perfect for families and those looking for more space, suburban homes
					provide larger lots, family-friendly neighborhoods, and proximity to
					schools and parks.
				</p>
			</ContentContainer>
			<ContentContainer imageSrc="listing-04.jpg" reverse>
				<h4>
					Rural <br />
					Properties
				</h4>
				<p class="small">
					For those wanting more privacy and a closer connection to nature,
					rural properties offer expansive land, scenic views, and a peaceful
					environment.
				</p>
			</ContentContainer>
		</div>
		<div class="property-types__row-2">
			<ContentContainer imageSrc="urban-condo.jpg" reverse>
				<h4>
					Luxiry <br />
					Estates
				</h4>
				<p class="small">
					Catering to high-end buyers, luxury estates feature premium finishes,
					extensive amenities, and exclusive locations.
				</p>
			</ContentContainer>
			<ContentContainer imageSrc="listing-01.jpg" reverse>
				<h4>
					New <br />
					Developments
				</h4>
				<p class="small">
					The Southwest region is seeing significant new development projects,
					offering brand-new homes with the latest designs and technologies.
				</p>
			</ContentContainer>
		</div>
	</section>
	<section class="property-list__insights">
		<ContentContainer imageSrc="insights.jpg">
			<h2>Expert <span>Insights</span></h2>
			<p>
				At Southwest Sanctuary Homes, our team of experienced professionals is
				dedicated to providing you with the expert insights and guidance you
				need to navigate the real estate market confidently. Whether you're
				buying, selling, or investing, our expertise covers all aspects of the
				process.
			</p>
			<div class="insights-icons">
				<div class="insights-icons__col">
					<div class="insights-icons__row">
						<i class="fa-solid fa-chart-column"></i>
						<h5>Market Analysis</h5>
					</div>
					<div class="insights-icons__row">
						<i class="fa-solid fa-dollar-sign"></i>
						<h5>Property Valuation</h5>
					</div>
					<div class="insights-icons__row">
						<i class="fa-solid fa-handshake"></i>
						<h5>Negotiation Strategies</h5>
					</div>
					<div class="insights-icons__row">
						<i class="fa-solid fa-file-pen"></i>
						<h5>Contractual Support</h5>
					</div>
				</div>
				<div class="insights-icons__col">
					<div class="insights-icons__row">
						<i class="fa-solid fa-house-flag"></i>
						<h5>Neighborhood Knowledge</h5>
					</div>
					<div class="insights-icons__row">
						<i class="fa-solid fa-couch"></i>
						<h5>Home Staging and Preparation</h5>
					</div>
					<div class="insights-icons__row">
						<i class="fa-solid fa-sack-dollar"></i>
						<h5>Financing Guidance</h5>
					</div>
					<div class="insights-icons__row">
						<i class="fa-solid fa-chart-line"></i>
						<h5>Investment Advice</h5>
					</div>
				</div>
			</div>
		</ContentContainer>
	</section>
</template>

<script setup>
import ContentContainer from '@/components/ui/ContentContainer.vue';
import SortButton from '@/components/ui/SortButton.vue';
import AppFilter from '@/components/ui/AppFilter.vue';
import PropertyCardContainer from '@/components/ui/PropertyCardContainer.vue';
import PropertyCard from '@/components/ui/PropertyCard.vue';
import AppPagination from '@/components/ui/AppPagination.vue';
import { computed, onMounted } from 'vue';
import { usePropertyStore } from '@/store/propertyStore';

const propertyStore = usePropertyStore();

onMounted(async () => {
	await propertyStore.fetchProperties();
});

const properties = computed(() => propertyStore.properties);

function setTitleImage(images) {
	const reversedImages = [...images].reverse();
	return reversedImages[0];
}
</script>

<style scoped>
.property-list__intro .content-container {
	gap: 150px;
}

.property-list__intro >>> .content-image {
	width: 420px;
	height: 530px;
}

.active-listings h1 {
	font-size: 48px;
	text-align: center;
}

.listings-tools {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 50px 0;
}

.active-listings .pagination-container {
	margin-top: 50px;
	margin-bottom: 150px;
}

.property-list__trends .content-container {
	gap: 100px;
}

.property-list__trends >>> .content-image {
	width: 550px;
	height: 800px;
}

.property-types__row-1 {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 20px;
}

.property-types__row-2 {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 20px;
	width: 70%;
	margin: auto;
}

.property-list__types .content-container {
	gap: 25px;
	padding: 20px;
}

.property-list__types >>> .content-image {
	width: 170px;
	height: 195px;
}

.property-list__insights .content-container {
	gap: 100px;
}

.property-list__insights >>> .content-image {
	width: 500px;
	height: 800px;
}

.insights-icons {
	display: grid;
	grid-template-columns: 1fr 1fr;
	margin-top: 7%;
}

.insights-icons__row {
	display: grid;
	grid-template-columns: 1fr 3fr;
	align-items: center;
}

.insights-icons__row i {
	font-size: 50px;
	color: var(--accent-color);
}

.insights-icons__row h5 {
	font-size: 16px;
	font-weight: 500;
}
</style>
