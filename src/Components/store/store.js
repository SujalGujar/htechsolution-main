// import { configureStore } from "@reduxjs/toolkit";

// import heroSectionReducer from "./HomepageSlices/HeroSectionSlice";
// import aboutUsReducer from "./HomepageSlices/AboutUsSlice";
// import softwareSolutionsReducer from "./HomepageSlices/HardwareSlice";
// import softwareProjectReducer from "./HomepageSlices/SoftwareProjectSlice";
// import projectDeliverableReducer from "./HomepageSlices/ProjectDeliverableSlice";
// import achievementsReducer from "./HomepageSlices/OurAchievementsSlice";
// import teamReducer from "./HomepageSlices/OurPartnerSlice";
// import ourServiceReducer from "./AboutUsPageSlices/OurServicesSlice";
// import ClientExperienceSlice from "./HomepageSlices/ClientExperienceSlice";
// import trendingReducer from "./HomepageSlices/TrendingTopicSlice";
// import whatWeAreReducer from "./AboutUsPageSlices/WhatWeAreSlice";
// import visionMissionReducer from "./AboutUsPageSlices/VisionMisionSlice";
// // import teamReducer from "./AboutUsPageSlices/TeamAdminSlice";
// import ourTeamReducer from "./AboutUsPageSlices/TeamAdminSlice";
// // import blogHeroSectionSlice from "./Blogs/BlogHeroSlice";
// import blogHeroReducer from "./Blogs/BlogHeroSlice";
// import blogGalleryReducer from "./Blogs/BlogsSlice";
// import expertiseReducer from "./AboutUsPageSlices/OurExpertiseSlice";
// export const store = configureStore({
//   reducer: {
//     heroSection: heroSectionReducer,
//     aboutUsSection: aboutUsReducer,
//     softwareSolutions: softwareSolutionsReducer,
//     projects: softwareProjectReducer,
//     projectDeliverables: projectDeliverableReducer,
//     ourAchievementsSection: achievementsReducer,
//     team: teamReducer,
//     ourServices: ourServiceReducer,
//     clientExperience: ClientExperienceSlice,
//      trending: trendingReducer,
//  whatWeAre: whatWeAreReducer, sections: visionMissionReducer,
//   ourTeam: ourTeamReducer, 
//   blogHero: blogHeroReducer,
//     blogGallery: blogGalleryReducer,
//      expertise: expertiseReducer,
    

//  },
// });


import { configureStore } from "@reduxjs/toolkit";

import heroSectionReducer       from "./HomepageSlices/HeroSectionSlice";
import aboutUsReducer            from "./HomepageSlices/AboutUsSlice";
import hardwareSolutionsReducer  from "./HomepageSlices/HardwareSlice";
import softwareProjectReducer    from "./HomepageSlices/SoftwareProjectSlice";
import projectDeliverableReducer from "./HomepageSlices/ProjectDeliverableSlice";
import achievementsReducer       from "./HomepageSlices/OurAchievementsSlice";
import teamReducer               from "./HomepageSlices/OurPartnerSlice";
import ourServiceReducer         from "./AboutUsPageSlices/OurServicesSlice";
import clientExperienceReducer   from "./HomepageSlices/ClientExperienceSlice";
import trendingReducer           from "./HomepageSlices/TrendingTopicSlice";
import whatWeAreReducer          from "./AboutUsPageSlices/WhatWeAreSlice";
import visionMissionReducer      from "./AboutUsPageSlices/VisionMisionSlice";
import ourTeamReducer            from "./AboutUsPageSlices/TeamAdminSlice";
import blogHeroReducer           from "./Blogs/BlogHeroSlice";
import blogGalleryReducer        from "./Blogs/BlogsSlice";
import expertiseReducer          from "./AboutUsPageSlices/OurExpertiseSlice";


// console.log("1 heroSectionReducer:", typeof heroSectionReducer);
// console.log("2 aboutUsReducer:", typeof aboutUsReducer);
// console.log("3 hardwareSolutionsReducer:", typeof hardwareSolutionsReducer);
// console.log("4 softwareProjectReducer:", typeof softwareProjectReducer);
// console.log("5 projectDeliverableReducer:", typeof projectDeliverableReducer);
// console.log("6 achievementsReducer:", typeof achievementsReducer);
// console.log("7 teamReducer:", typeof teamReducer);
// console.log("8 ourServiceReducer:", typeof ourServiceReducer);
// console.log("9 clientExperienceReducer:", typeof clientExperienceReducer);
// console.log("10 trendingReducer:", typeof trendingReducer);
// console.log("11 whatWeAreReducer:", typeof whatWeAreReducer);
// console.log("12 visionMissionReducer:", typeof visionMissionReducer);
// console.log("13 ourTeamReducer:", typeof ourTeamReducer);
// console.log("14 blogHeroReducer:", typeof blogHeroReducer);
// console.log("15 blogGalleryReducer:", typeof blogGalleryReducer);
// console.log("16 expertiseReducer:", typeof expertiseReducer);
export const store = configureStore({
  reducer: {
    heroSection:          heroSectionReducer,
    aboutUsSection:       aboutUsReducer,
    hardwareSolutions:    hardwareSolutionsReducer, 
    projects:             softwareProjectReducer,
    projectDeliverables:  projectDeliverableReducer,
    ourAchievementsSection: achievementsReducer,
    team:                 teamReducer,
    ourServices:          ourServiceReducer,
    clientExperience:     clientExperienceReducer,
    trending:             trendingReducer,
    whatWeAre:            whatWeAreReducer,
    sections:             visionMissionReducer,
    ourTeam:              ourTeamReducer,
    blogHero:             blogHeroReducer,
    blogGallery:          blogGalleryReducer,
    expertise:            expertiseReducer,
  },
});