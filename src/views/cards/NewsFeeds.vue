<template>
  <div>
    <v-row>
      <!-- Influencing The Influencer -->
      <v-col md="4" sm="6" cols="12" v-for="news in News" :key="news.aurthor">
        <v-hover v-slot="{ hover }"
        >
          <v-card 
          :elevation="hover ? 16 : 2"
          :class="{ 'on-hover': hover }"
          >
            <v-img :src="news.urlToImage" height="250" />
            <v-card-title>
              {{ news.title }}
            </v-card-title>
            <v-card-text>
              {{ news.description }}
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <!-- <v-overlay :value="overlay">
    <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
  </v-overlay> -->
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import axios from 'axios'

import {
  mdiChevronUp,
  mdiChevronDown,
  mdiCartPlus,
  mdiShareVariantOutline,
  mdiLockOpenOutline,
  mdiStarOutline,
  mdiAccountOutline,
  mdiTrendingUp,
  mdiHelpCircleOutline,
} from '@mdi/js'

export default {
  data() {
    return {
      overlay: false,
    }
  },
  setup() {
    const isCardDetailsVisible = false
    const rating = ref(5)

    return {
      isCardDetailsVisible,
      rating,

      // icons
      icons: {
        mdiChevronUp,
        mdiChevronDown,
        mdiCartPlus,
        mdiShareVariantOutline,
        mdiLockOpenOutline,
        mdiStarOutline,
        mdiAccountOutline,
        mdiTrendingUp,
        mdiHelpCircleOutline,
      },
    }
  },
  data() {
    return {
      News: [
        {
          source: {
            id: null,
            name: 'New York Post',
          },
          author: 'Lee Brown',
          title: "HIV patient 'cured' herself without treatment, study suggests - New York Post ",
          description:
            'The 30-year-old mom has been dubbed the “Esperanza patient” after the Argentinian town where she lives — and whose name fittingly means “hope.”',
          url: 'https://nypost.com/2021/11/16/hiv-patient-cured-herself-without-treatment-study-suggests/',
          urlToImage:
            'https://nypost.com/wp-content/uploads/sites/2/2021/11/newspress-collage-20161485-1637085495686.png?w=1024',
          publishedAt: '2021-11-16T19:03:00Z',
          content:
            'An Argentinian woman appears to have been naturally “cured” of HIV despite not being on medication, according to scientists who hailed the case as a “rare” hope for the nearly 38 million people infec… [+2481 chars]',
        },
        {
          source: {
            id: 'cnn',
            name: 'CNN',
          },
          author: 'Madeline Holcombe, CNN',
          title: 'Your morning cups of coffee and tea could be associated with lower risk of stroke and dementia - CNN',
          description:
            "The cup of coffee or tea you reach for in the morning -- OK, maybe it's a few -- may be associated with a lower risk for stroke and dementia, according to a new study.",
          url: 'https://www.cnn.com/2021/11/16/health/coffee-and-tea-benefits-stroke-dementia-wellness/index.html',
          urlToImage: 'https://cdn.cnn.com/cnnnext/dam/assets/211115125113-stirring-coffee-stock-super-tease.jpg',
          publishedAt: '2021-11-16T19:02:00Z',
          content: null,
        },
        {
          source: {
            id: 'business-insider',
            name: 'Business Insider',
          },
          author: 'Dr. Catherine Schuster-Bruce',
          title: 'Antibody tests can show if need COVID-19 booster shot: experts - Business Insider',
          description:
            'Antibody tests are a "no brainer" for those at higher risk of severe COVID-19, experts say — but they can\'t agree on whether everyone should take one.',
          url: 'https://www.businessinsider.com/covid-antibody-test-should-i-get-one-booster-vaccine-expert-2021-11',
          urlToImage: 'https://i.insider.com/61923e47d672280019244bc6?width=1200&format=jpeg',
          publishedAt: '2021-11-16T17:55:18Z',
          content:
            "People should take an antibody test to see whether they need a COVID-19 booster shot, some experts have said.\r\nThese experts, including epidemiologists and virologists, can't agree on whether everybo… [+4694 chars]",
        },
        {
          source: {
            id: null,
            name: 'Gizmodo.com',
          },
          author: 'Ed Cara',
          title: 'A Huge Flu Outbreak in Michigan May Be a Sign of Things to Come This Winter - Gizmodo',
          description:
            'Over 500 people at the University of Michigan have recently come down with influenza, with a large majority of cases being unvaccinated.',
          url: 'https://gizmodo.com/a-huge-flu-outbreak-in-michigan-may-be-a-sign-of-things-1848066191',
          urlToImage:
            'https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/a84c1c1a3ab06a49d47cc65459b80510.jpg',
          publishedAt: '2021-11-16T17:25:00Z',
          content:
            'An outbreak of flu at the University of Michigan has sickened more than 500 people since early October. Local health officials have now brought in help from the Centers for Disease Control and Preven… [+2955 chars]',
        },
        {
          source: {
            id: 'fox-news',
            name: 'Fox News',
          },
          author: 'Julia Musto',
          title: 'Man hospitalized with seizures discovers tapeworm was in brain for decades - Fox News',
          description:
            'A man hospitalized with mysterious seizures and an "altered mental status" had tapeworms living in his brain for decades, according to researchers.',
          url: 'https://www.foxnews.com/health/man-hospitalized-seizures-tapeworm-brain-decades',
          urlToImage: 'https://static.foxnews.com/foxnews.com/content/uploads/2021/11/Tapeworms.jpg',
          publishedAt: '2021-11-16T16:22:37Z',
          content:
            'A man hospitalized with mysterious seizures and an "altered mental status" had tapeworms living in his brain for decades, according to researchers. \r\nIn a case study published last week in The New En… [+4476 chars]',
        },
        {
          source: {
            id: null,
            name: 'Cbslocal.com',
          },
          author: 'CBSBoston.com Staff',
          title: 'Alzheimer’s Disease Nasal Vaccine To Be Tested At Brigham And Women’s Hospital - CBS Boston',
          description: 'Brigham and Women’s Hospital is going to test a nasal vaccine for Alzheimer’s Disease.',
          url:
            'https://boston.cbslocal.com/2021/11/16/alzheimers-disease-nasal-vaccine-trial-protollin-brigham-and-womens-hospital-boston/',
          urlToImage: 'https://boston.cbslocal.com/wp-content/uploads/sites/3859903/2020/03/brigham.jpg?w=1024',
          publishedAt: '2021-11-16T15:23:00Z',
          content:
            'BOSTON (CBS) – Brigham and Women’s Hospital is going to test a nasal vaccine for Alzheimer’s Disease.\r\nThe hospital announced the launch of a clinical trial Tuesday to test the safety and efficacy of… [+1332 chars]',
        },
        {
          source: {
            id: null,
            name: 'WPXI Pittsburgh',
          },
          author: 'Sarafina James',
          title:
            'Local mother shares frightening experience with children’s syndrome linked to COVID-19 - WPXI Pittsburgh',
          description:
            'An Indiana County 9-year-old recently recovered from Multisystem Inflammatory Syndrome in Children after spending three days at UPMC Children’s Hospital in Pittsburgh.',
          url:
            'https://www.wpxi.com/news/top-stories/family-shares-frightening-experience-with-childrens-syndrome-linked-covid-19/VZ6BLM6MQNB4PKAGBIPKAYHP3I/',
          urlToImage:
            'https://cmg-cmg-tv-10080-prod.cdn.arcpublishing.com/resizer/sO7kss_TnYH3Uv5AgGtebKiOcA0=/1440x810/filters:format(jpg):quality(70)/d1hfln2sfez66z.cloudfront.net/11-16-2021/t_2506f21f0c9047fcbe75f4c0793bbb38_name_file_960x540_1200_v3_1_.jpg',
          publishedAt: '2021-11-16T15:14:23Z',
          content:
            'PITTSBURGH — An Indiana County 9-year-old recently recovered from Multisystem Inflammatory Syndrome in Children after spending three days at UPMC Childrens Hospital in Pittsburgh.\r\nColton Neeses moth… [+666 chars]',
        },
        {
          source: {
            id: 'rt',
            name: 'RT',
          },
          author: 'RT',
          title: 'NHS setting up fat camps for children - RT',
          description:
            'The NHS is setting up weight loss clinics for severely obese children and young people across England, warning that childhood obesity rates soared to their highest recorded levels during the Covid-19 pandemic.',
          url: 'https://www.rt.com/uk/540429-nhs-fat-camps-childhood-obesity/',
          urlToImage: 'https://cdni.rt.com/files/2021.11/article/6193bc0785f5402b2150d876.jpg',
          publishedAt: '2021-11-16T14:14:00Z',
          content:
            'Figures released on Tuesday by the National Childhood Measurement Programme (NCMP) showed nearly one in seven children entering their first year of schooling were obese. Meanwhile, more than a quarte… [+1591 chars]',
        },
        {
          source: {
            id: null,
            name: 'The Conversation Africa',
          },
          author: 'Anuraag Bukkuri',
          title:
            'Cancers are in an evolutionary battle with treatments – evolutionary game theory could tip the advantage to medicine - The Conversation US',
          description:
            'Applying the principles of ecology and evolution could help oncologists anticipate cancer drug resistance and optimize their treatment plans for patients.',
          url:
            'https://theconversation.com/cancers-are-in-an-evolutionary-battle-with-treatments-evolutionary-game-theory-could-tip-the-advantage-to-medicine-170175',
          urlToImage:
            'https://images.theconversation.com/files/431374/original/file-20211110-19-63o4rf.jpg?ixlib=rb-1.1.0&rect=0%2C239%2C1999%2C999&q=45&auto=format&w=1356&h=668&fit=crop',
          publishedAt: '2021-11-16T13:19:36Z',
          content:
            'Cancer was the second leading cause of death in the U.S. in 2020. Although billions of dollars have been poured into cancer research, the results are still disappointing for many patients who pay hun… [+5103 chars]',
        },
        {
          source: {
            id: null,
            name: 'Prevention.com',
          },
          author: 'Adele Jackson-Gibson',
          title: 'What Is Lewy Body Dementia? - Lewy Body Dementia Symptoms, Causes, and Treatment - Prevention.com',
          description: 'Robin Williams had it—and here’s what everyone should know about symptoms.',
          url: 'https://www.prevention.com/health/health-conditions/a38191477/lewy-body-dementia-symptoms/',
          urlToImage:
            'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/actor-robin-williams-appears-onstage-during-mtvs-total-news-photo-1636404140.jpg?crop=1.00xw:0.755xh;0,0.127xh&resize=1200:*',
          publishedAt: '2021-11-16T12:35:41Z',
          content:
            'Let’s first clear up one common misconception about dementia: It is not one specific disease but a term that encompasses a wide variety of conditions that severely affect brain functions important fo… [+10197 chars]',
        },
        {
          source: {
            id: null,
            name: 'Best Life',
          },
          author: null,
          title: 'Doing This Slashes Your Diabetes Risk by 70 Percent After Age 60, CDC Says - msnNOW',
          description:
            "Concerned about your risk of diabetes? The CDC says if you're over 60 years old, doing this one thing could slash your risk dramatically.",
          url: 'https://bestlifeonline.com/news-diabetes-risk-cdc/',
          urlToImage:
            'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAQLPOg.img?h=630&w=1200&m=6&q=60&o=t&l=f&f=jpg&x=602&y=226',
          publishedAt: '2021-11-16T12:33:28Z',
          content:
            'Prediabetes, the precursor to diabetes, is a serious health condition in which your blood sugar is elevated moderately above normal levels. Roughly 88 million Americansor 1 in 3 American adultshave p… [+721 chars]',
        },
        {
          source: {
            id: 'reuters',
            name: 'Reuters',
          },
          author: null,
          title: 'Explainer: Delta dominates the world, but scientists watch for worrisome offspring - Reuters',
          description:
            'The Delta variant of the SARS-CoV-2 virus now accounts for  nearly all of the coronavirus infections globally, fueled by unchecked spread of the novel coronavirus in many parts of the world. So far, vaccines are still able to defend against serious disease an…',
          url:
            'https://www.reuters.com/business/healthcare-pharmaceuticals/delta-dominates-world-scientists-watch-worrisome-offspring-2021-11-15/',
          urlToImage:
            'https://www.reuters.com/resizer/OfnhU52j9OxK2ZlzP5olcnZWwKg=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/5ZZA57Y57ZPCXD346726M6L6UY.jpg',
          publishedAt: '2021-11-16T11:36:00Z',
          content:
            'Pedestrians walk along a shopping street after the Austrian government placed roughly two million people who are not fully vaccinated against the coronavirus disease (COVID-19) on lockdown, in Vienna… [+3828 chars]',
        },
        {
          source: {
            id: null,
            name: 'Florida Today',
          },
          author: 'Susan Hammerling-Hodgers, Florida Today',
          title:
            'Hammerling-Hodgers: Prostate cancer is second-most common cancer for men; know the signs - Florida Today',
          description:
            'Prostate cancer is the second most frequently diagnosed cancer worldwide and one of the most common causes of cancer deaths among men.',
          url:
            'https://www.floridatoday.com/story/life/wellness/2021/11/16/prostate-cancer-second-most-common-cancer-men-know-signs/8591859002/',
          urlToImage:
            'https://www.gannett-cdn.com/-mm-/fa74045ef27d3a8fa75200d01b5fd60c219ecf48/c=0-377-7360-4535/local/-/media/2017/10/13/Brevard/Brevard/636435225500981142-GettyImages-485382298.jpg?auto=webp&format=pjpg&width=1200',
          publishedAt: '2021-11-16T11:23:14Z',
          content:
            'Support local journalism. An unlimited digital subscription is just $1 for 6 months. Click here and subscribe today.\r\nAfter 10 years of being diagnosed with prostate cancer, a 70-year-old man develop… [+4189 chars]',
        },
        {
          source: {
            id: null,
            name: 'Herald-Mail Media',
          },
          author: 'Staff Report, The Hagerstown Herald-Mail',
          title:
            'After decline, new COVID cases skyrocket in Tri-State; 25 die from illness last week - Herald-Mail Media',
          description:
            'The number of new reported COVID cases surged last week in the Tri-State area, with some counties reporting a more than 95% increase.',
          url:
            'https://www.heraldmailmedia.com/story/news/2021/11/16/percent-of-new-covid-cases-soar-in-tri-state-25-die-last-week-maryland-pennsylvania-west-virginia/49380099/',
          urlToImage:
            'https://www.gannett-cdn.com/presto/2021/11/09/NTHM/b4cac84c-c283-4a1d-b054-81aca5b29aec-DSC_7928.jpeg?auto=webp&crop=1999,1125,x0,y73&format=pjpg&width=1200',
          publishedAt: '2021-11-16T10:06:54Z',
          content:
            'The number of new reported cases of coronavirus in the Tri-State area surged last week after nearly a month of declines, a USA TODAY Network analysis of Johns Hopkins University data shows. \r\nAlmost … [+5609 chars]',
        },
        {
          source: {
            id: null,
            name: 'Newser',
          },
          author: 'Evann Gastaldo',
          title: 'Girl, 11, Likely Got Gonorrhea From Hot Spring - Newser',
          description: 'Doctors say infected swimmer likely left bacteria behind',
          url: 'https://www.newser.com/story/313427/11-year-old-likely-got-gonorrhea-from-hot-spring.html',
          urlToImage: 'https://img2-azrcdn.newser.com/image/1385369-12-20211116070359.jpeg',
          publishedAt: '2021-11-16T08:33:00Z',
          content:
            '(Newser)\r\nAn 11-year-old Austrian girl started experiencing vaginal burning and discharge while on vacation with her family in Italy—and back home, it was determined she had gonorrhea. In a case stud… [+1145 chars]',
        },
        {
          source: {
            id: null,
            name: 'KOMO News',
          },
          author: 'KOMO News Staff',
          title: 'Local health officials urge families to get kids flu shots after sharp decline - KOMO News',
          description:
            'Local health officials are urging families to have their kids vaccinated against the flu after a sharp decline in childhood flu vaccine rates this year.  The Washington Department of Health said pediatric flu vaccinations are down about 25 percent from this t…',
          url:
            'https://komonews.com/news/local/local-health-officials-urge-families-to-get-kids-flu-shots-after-sharp-decline',
          urlToImage:
            'https://static-21.sinclairstoryline.com/resources/media/42378271-8e30-4194-8bee-2a51fa1018e0-large16x9_fluseason.jpg?1637025351856',
          publishedAt: '2021-11-16T01:19:45Z',
          content: null,
        },
        {
          source: {
            id: null,
            name: 'FOX 10 News Phoenix',
          },
          author: 'Matt Galka',
          title:
            "'I didn't know what was going on': Woman moves to Arizona, contracts valley fever meningitis - FOX 10 News Phoenix",
          description:
            'A woman who just moved to Phoenix says she woke up and something was very off. She learned she contracted a fungal infection known as valley fever. "I didn’t know what was going on. All I knew was that my legs were on fire."',
          url:
            'https://www.fox10phoenix.com/news/i-didnt-know-what-was-going-on-woman-moves-to-arizona-contracts-valley-fever-meningitis',
          urlToImage:
            'https://images.foxtv.com/static.fox10phoenix.com/www.fox10phoenix.com/content/uploads/2021/11/1280/720/e25866ef-snapshot-46.jpg?ve=1&tl=1',
          publishedAt: '2021-11-16T00:44:21Z',
          content:
            "PHOENIX - Viewer discretion is advised as photos of the woman's rash are shown several times in the video.\r\nThis week is Valley Fever Awareness Week and a Phoenix woman is sharing her battle with the… [+1551 chars]",
        },
        {
          source: {
            id: 'the-hill',
            name: 'The Hill',
          },
          author: 'Cristina Marcos',
          title: "House passes bill to expand veterans' access to COVID-19, flu vaccines | TheHill - The Hill",
          description:
            'The House passed legislation on Monday that would expand access for veterans, their spouses and t...',
          url:
            'https://thehill.com/homenews/house/581661-house-passes-bill-to-expand-veterans-access-to-covid-19-flu-vaccines',
          urlToImage:
            'https://thehill.com/sites/default/files/article_images/coronavirus-vaccine_080721getty_vaccines.jpg',
          publishedAt: '2021-11-16T00:35:06Z',
          content:
            'The House passed legislation on Monday that would expand access for veterans, their spouses and their caregivers to receive vaccines for both the flu and COVID-19 through the Department of Veterans A… [+1896 chars]',
        },
        {
          source: {
            id: null,
            name: 'Milwaukee Journal Sentinel',
          },
          author: 'Paul A. Smith, Milwaukee Journal Sentinel',
          title:
            'Wisconsin health officials recommend hunters wear a mask when field dressing deer - Milwaukee Journal Sentinel',
          description:
            'SARS-CoV-2 virus has been found in white-tailed deer, leading to the  advice that hunters should take one more precaution while handling a carcass.',
          url:
            'https://www.jsonline.com/story/sports/outdoors/2021/11/15/wisconsin-hunters-advised-wear-mask-when-dressing-deer-due-covid/6354897001/',
          urlToImage:
            'https://www.gannett-cdn.com/presto/2019/03/29/PMJS/27106c26-b502-40b3-984a-a7ed81b4bb8c-Deer_buck_trio.jpg?auto=webp&crop=3455,1943,x1,y66&format=pjpg&width=1200',
          publishedAt: '2021-11-16T00:15:16Z',
          content:
            'Due to findings of SARS-CoV-2 in white-tailed deer, Wisconsin health officials have added a few planks to their recommendations to hunters this fall, including wearing a mask when field dressing deer… [+5173 chars]',
        },
        {
          source: {
            id: null,
            name: 'Daily Mail',
          },
          author: 'Roger Dobson',
          title: 'Blood taken from runners can slow down dementia - Daily Mail',
          description:
            "Doctors are giving monthly transfusions to around 60 people with early signs of Alzheimer's in a year-long clinical trial led by the Norwegian University of Science and Technology.",
          url: 'https://www.dailymail.co.uk/health/article-10205315/Blood-taken-runners-slow-dementia.html',
          urlToImage: 'https://i.dailymail.co.uk/1s/2021/11/15/23/50529097-0-image-a-12_1637018065708.jpg',
          publishedAt: '2021-11-16T00:14:00Z',
          content:
            'A transfusion of blood from runners could be a ground-breaking treatment for slowing down Alzheimers disease.\r\nIts thought that a cocktail of chemicals released in the blood after exercise has rejuve… [+8922 chars]',
        },
      ],
    }
  },
  created() {
    //  this.getNews()
    console.log(this.News)
  },

  methods: {
    // getNews() {
    //   axios
    //     .get(
    //       'https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=c5d2d6c9e91c43acbcc781a1241870eb',
    //       { baseURL: '/' },
    //       {
    //         params: {
    //           country: 'us',
    //           category: 'health',
    //           apiKey: 'c5d2d6c9e91c43acbcc781a1241870eb',
    //         },
    //       },
    //     )
    //     .then(res => {
    //       //  console.log(res)
    //       this.News = res.data.articles
    //       this.overlay = false
    //     })
    //     .catch(error => {
    //       console.error('error', error)
    //       this.overlay = false
    //     })
    // },
  },
}
</script>

<style lang="scss" scoped>
@import '@/plugins/vuetify/default-preset/preset/mixins.scss';

.avatar-center {
  top: -2rem;
  left: 1rem;
  border: 3px solid white;
  position: absolute;
}

// membership pricing
@include theme--child(memberpricing-bg) using ($material) {
  background-color: rgba(map-deep-get($material, 'primary-shade'), map-deep-get($material, 'states', 'hover'));
}

.memberpricing-bg {
  position: relative;
}
.membership-pricing {
  text-align: center;
  sup {
    font-size: 3.75rem;
    top: 9px;
  }
}
</style>
