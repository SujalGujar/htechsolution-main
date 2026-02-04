import { configureStore } from "@reduxjs/toolkit";

import heroSectionReducer from "./HomepageSlices/HeroSectionSlice";
import aboutUsReducer from "./HomepageSlices/AboutUsSlice";
import softwareSolutionsReducer from "./HomepageSlices/HardwareSlice";
import softwareProjectReducer from "./HomepageSlices/SoftwareProjectSlice";
import projectDeliverableReducer from "./HomepageSlices/ProjectDeliverableSlice";
import achievementsReducer from "./HomepageSlices/OurAchievementsSlice";
import teamReducer from "./HomepageSlices/OurPartnerSlice";
import ourServiceReducer from "./AboutUsPageSlices/OurServicesSlice";
import ClientExperienceSlice from "./HomepageSlices/ClientExperienceSlice";
import trendingReducer from "./HomepageSlices/TrendingTopicSlice";
import whatWeAreReducer from "./AboutUsPageSlices/WhatWeAreSlice";
import visionMissionReducer from "./AboutUsPageSlices/VisionMisionSlice";
// import teamReducer from "./AboutUsPageSlices/TeamAdminSlice";
import ourTeamReducer from "./AboutUsPageSlices/TeamAdminSlice";
// import blogHeroSectionSlice from "./Blogs/BlogHeroSlice";
import blogHeroReducer from "./Blogs/BlogHeroSlice";
import blogGalleryReducer from "./Blogs/BlogsSlice";
import expertiseReducer from "./AboutUsPageSlices/OurExpertiseSlice";
export const store = configureStore({
  reducer: {
    heroSection: heroSectionReducer,
    aboutUsSection: aboutUsReducer,
    softwareSolutions: softwareSolutionsReducer,
    projects: softwareProjectReducer,
    projectDeliverables: projectDeliverableReducer,
    ourAchievementsSection: achievementsReducer,
    team: teamReducer,
    ourServices: ourServiceReducer,
    clientExperience: ClientExperienceSlice,
     trending: trendingReducer,
 whatWeAre: whatWeAreReducer, sections: visionMissionReducer,
  ourTeam: ourTeamReducer, 
  blogHero: blogHeroReducer,
    blogGallery: blogGalleryReducer,
     expertise: expertiseReducer,
    

 },
});
