import {defineArrayMember, defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'
import {DocumentIcon} from '@sanity/icons/Document'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {HelpCircleIcon} from '@sanity/icons/HelpCircle'
import {ImageIcon} from '@sanity/icons/Image'
import {TagIcon} from '@sanity/icons/Tag'
import {UserIcon} from '@sanity/icons/User'

const seo = defineType({name: 'seo', title: 'SEO', type: 'object', fields: [
  defineField({name: 'title', type: 'string'}),
  defineField({name: 'description', type: 'text', rows: 3}),
  defineField({name: 'noIndex', title: 'Hide from search engines', type: 'boolean'}),
  defineField({name: 'image', title: 'Social image', type: 'image', options: {hotspot: true}}),
]})

const service = defineType({name: 'service', title: 'Services', type: 'document', icon: DocumentTextIcon, fields: [
  defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
  defineField({name: 'slug', type: 'slug', options: {source: 'title'}, validation: (rule) => rule.required()}),
  defineField({name: 'eyebrow', type: 'string'}),
  defineField({name: 'lead', type: 'text', rows: 4}),
  defineField({name: 'overview', type: 'text', rows: 5}),
  defineField({name: 'skills', type: 'array', of: [defineArrayMember({type: 'string'})]}),
  defineField({name: 'useCases', title: 'Use cases', type: 'array', of: [defineArrayMember({type: 'string'})]}),
  defineField({name: 'benefits', type: 'array', of: [defineArrayMember({type: 'string'})]}),
  defineField({name: 'image', title: 'Service image', type: 'image', options: {hotspot: true}}),
  defineField({name: 'isPublished', title: 'Show on the website', type: 'boolean', initialValue: false}),
  defineField({name: 'seo', type: 'seo'}),
]})

const industry = defineType({name: 'industry', title: 'Industries', type: 'document', icon: TagIcon, fields: [
  defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
  defineField({name: 'slug', type: 'slug', options: {source: 'title'}, validation: (rule) => rule.required()}),
  defineField({name: 'description', type: 'text', rows: 4}),
  defineField({name: 'image', title: 'Industry image', type: 'image', options: {hotspot: true}}),
  defineField({name: 'isFeatured', title: 'Show on homepage', type: 'boolean', initialValue: true}),
]})

const insight = defineType({name: 'insight', title: 'Insights & news', type: 'document', icon: DocumentTextIcon, fields: [
  defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
  defineField({name: 'slug', type: 'slug', options: {source: 'title'}}),
  defineField({name: 'category', type: 'string'}),
  defineField({name: 'excerpt', type: 'text', rows: 4}),
  defineField({name: 'body', title: 'Article body', type: 'text', rows: 16}),
  defineField({name: 'author', type: 'string'}),
  defineField({name: 'publishedAt', type: 'datetime'}),
  defineField({name: 'url', type: 'url'}),
  defineField({name: 'image', title: 'Insight image', type: 'image', options: {hotspot: true}}),
  defineField({name: 'isPublished', title: 'Publish article', type: 'boolean', initialValue: false}),
  defineField({name: 'isFeatured', title: 'Show on homepage', type: 'boolean', initialValue: true}),
  defineField({name: 'seo', type: 'seo'}),
]})

const resource = defineType({name: 'resource', title: 'Resources', type: 'document', icon: DocumentTextIcon, fields: [
  defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
  defineField({name: 'category', type: 'string', options: {list: ['Tools', 'Templates', 'Insights', 'Company']}}),
  defineField({name: 'excerpt', type: 'text', rows: 4, validation: (rule) => rule.required()}),
  defineField({name: 'url', title: 'Destination URL', type: 'string', validation: (rule) => rule.required()}),
  defineField({name: 'image', title: 'Resource image', type: 'image', options: {hotspot: true}, validation: (rule) => rule.required()}),
  defineField({name: 'isPublished', title: 'Show on website', type: 'boolean', initialValue: true}),
  defineField({name: 'order', type: 'number', initialValue: 0}),
]})

const faq = defineType({name: 'faq', title: 'Frequently asked questions', type: 'document', icon: HelpCircleIcon, fields: [
  defineField({name: 'question', type: 'string', validation: (rule) => rule.required()}),
  defineField({name: 'answer', type: 'text', rows: 5, validation: (rule) => rule.required()}),
  defineField({name: 'order', type: 'number', initialValue: 0}),
  defineField({name: 'isPublished', title: 'Show on website', type: 'boolean', initialValue: true}),
]})

const caseStudyCategory = defineType({name: 'caseStudyCategory', title: 'Case study categories', type: 'document', icon: TagIcon, fields: [
  defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
  defineField({name: 'description', type: 'text', rows: 3}),
]})

const caseStudy = defineType({name: 'caseStudy', title: 'Case studies', type: 'document', icon: DocumentTextIcon, fields: [
  defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
  defineField({name: 'slug', type: 'slug', options: {source: 'title'}}),
  defineField({name: 'client', type: 'string', validation: (rule) => rule.required()}),
  defineField({name: 'category', type: 'reference', to: [{type: 'caseStudyCategory'}]}),
  defineField({name: 'stack', title: 'Technology stack', type: 'string'}),
  defineField({name: 'outcome', type: 'text', rows: 4}),
  defineField({name: 'image', title: 'Project image', type: 'image', options: {hotspot: true}}),
  defineField({name: 'isFeatured', title: 'Feature on the website', type: 'boolean', initialValue: false}),
  defineField({name: 'isPublished', title: 'Show on the website', type: 'boolean', initialValue: false}),
  defineField({name: 'description', type: 'text', rows: 5}),
  defineField({name: 'challenge', type: 'text', rows: 4}),
  defineField({name: 'solution', type: 'text', rows: 4}),
  defineField({name: 'technologies', type: 'array', of: [defineArrayMember({type: 'string'})]}),
  defineField({name: 'seo', type: 'seo'}),
]})

const developer = defineType({name: 'developer', title: 'Developer profiles', type: 'document', icon: UserIcon, fields: [
  defineField({name: 'profileId', title: 'Profile ID', type: 'string', validation: (rule) => rule.required()}),
  defineField({name: 'name', type: 'string'}),
  defineField({name: 'role', type: 'string', validation: (rule) => rule.required()}),
  defineField({name: 'experience', type: 'string'}),
  defineField({name: 'skills', type: 'array', of: [defineArrayMember({type: 'string'})]}),
  defineField({name: 'availability', type: 'string'}),
  defineField({name: 'engagement', type: 'string'}),
  defineField({name: 'bio', type: 'text', rows: 4}),
  defineField({name: 'isPublished', title: 'Show on the website', type: 'boolean', initialValue: false}),
]})

const job = defineType({name: 'job', title: 'Job openings', type: 'document', icon: DocumentIcon, fields: [
  defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
  defineField({name: 'slug', type: 'slug', options: {source: 'title'}}),
  defineField({name: 'location', type: 'string'}),
  defineField({name: 'employmentType', type: 'string'}),
  defineField({name: 'summary', type: 'text', rows: 4}),
  defineField({name: 'skills', type: 'array', of: [defineArrayMember({type: 'string'})]}),
  defineField({name: 'isOpen', title: 'Open', type: 'boolean', initialValue: true}),
  defineField({name: 'createdAt', type: 'datetime', readOnly: true}),
]})

const sitePage = defineType({name: 'sitePage', title: 'Site pages', type: 'document', icon: DocumentIcon, fields: [
  defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
  defineField({name: 'pageKey', title: 'Page key', type: 'string', validation: (rule) => rule.required()}),
  defineField({name: 'path', title: 'Local route', type: 'string', readOnly: true, validation: (rule) => rule.required()}),
  defineField({name: 'family', title: 'Page family', type: 'string'}),
  defineField({name: 'sourceRouteId', title: 'Source route ID', type: 'string', readOnly: true}),
  defineField({name: 'sourceUrl', title: 'Source URL', type: 'url', readOnly: true}),
  defineField({name: 'contentHtml', title: 'Page HTML', description: 'Editable archived page markup. Changes are used by the local site renderer.', type: 'text', rows: 20}),
  defineField({name: 'isPublished', title: 'Show on the website', type: 'boolean', initialValue: true}),
  defineField({name: 'heroTitle', type: 'string'}),
  defineField({name: 'heroAccent', type: 'string'}),
  defineField({name: 'heroDescription', type: 'text', rows: 4}),
  defineField({name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}}),
  defineField({name: 'announcement', type: 'string'}),
  defineField({name: 'primaryCta', type: 'string'}),
  defineField({name: 'primaryCtaUrl', type: 'string'}),
  defineField({name: 'secondaryCta', type: 'string'}),
  defineField({name: 'secondaryCtaUrl', type: 'string'}),
  defineField({name: 'careerIntroTitle', type: 'string'}),
  defineField({name: 'careerIntroDescription', type: 'text', rows: 3}),
  ...['One', 'Two', 'Three', 'Four'].flatMap((number) => [
    defineField({name: `careerDiscipline${number}Title`, title: `Career discipline ${number} title`, type: 'string'}),
    defineField({name: `careerDiscipline${number}Description`, title: `Career discipline ${number} description`, type: 'text', rows: 3}),
  ]),
  defineField({name: 'detailSolutionsHeading', title: 'Detail page: solutions heading', type: 'string'}),
  defineField({name: 'detailSolutionsIntro', title: 'Detail page: solutions introduction', type: 'text', rows: 3}),
  defineField({name: 'detailSolutionsItems', title: 'Detail page: solutions (one per line: title :: description)', type: 'text', rows: 10}),
  defineField({name: 'detailCapabilitiesHeading', title: 'Detail page: capabilities heading', type: 'string'}),
  defineField({name: 'detailCapabilitiesIntro', title: 'Detail page: capabilities introduction', type: 'text', rows: 3}),
  defineField({name: 'detailCapabilityItems', title: 'Detail page: capability stages (one per line: title :: description)', type: 'text', rows: 8}),
  defineField({name: 'detailIndustriesIntro', title: 'Detail page: industry introduction', type: 'text', rows: 4}),
  defineField({name: 'detailIndustryItems', title: 'Detail page: industries (one per line: title :: description)', type: 'text', rows: 12}),
  defineField({name: 'detailWhyIntro', title: 'Detail page: why Kodrise introduction', type: 'text', rows: 4}),
  defineField({name: 'detailWhyItems', title: 'Detail page: reasons to choose Kodrise (one per line: title :: description)', type: 'text', rows: 8}),
  defineField({name: 'detailCreativeHeading', title: 'Detail page: generative AI applications heading', type: 'string'}),
  defineField({name: 'detailCreativeIntro', title: 'Detail page: generative AI applications introduction', type: 'text', rows: 4}),
  defineField({name: 'detailCreativeItems', title: 'Detail page: generative AI applications (one per line: title :: description)', type: 'text', rows: 8}),
  defineField({name: 'detailTechnologyIntro', title: 'Detail page: technology stack introduction', type: 'text', rows: 4}),
  defineField({name: 'detailTechnologyItems', title: 'Detail page: technology groups (one per line: group :: item, item, item)', type: 'text', rows: 8}),
  defineField({name: 'detailCaseStudiesIntro', title: 'Detail page: case studies introduction', type: 'text', rows: 3}),
  defineField({name: 'detailFaqItems', title: 'Detail page: FAQs (one per line: question :: answer)', type: 'text', rows: 12}),
  defineField({name: 'seo', type: 'seo'}),
]})

const siteAsset = defineType({name: 'siteAsset', title: 'Website images', type: 'document', icon: ImageIcon, fields: [
  defineField({name: 'slot', title: 'Image key', description: 'Stable key used by the website, for example home-hero or portfolio-scribeflo.', type: 'string', validation: (rule) => rule.required().regex(/^[a-z0-9][a-z0-9-]{0,119}$/)}),
  defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
  defineField({name: 'alt', title: 'Alternative text', type: 'string', validation: (rule) => rule.required()}),
  defineField({name: 'sourcePath', title: 'Replace this image URL or path', description: 'Optional exact source URL/path to replace on mirrored pages.', type: 'string'}),
  defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}, validation: (rule) => rule.required()}),
]})

const siteSettings = defineType({name: 'siteSettings', title: 'Site settings', type: 'document', icon: CogIcon, fields: [
  defineField({name: 'siteName', type: 'string'}),
  defineField({name: 'tagline', type: 'string'}),
  defineField({name: 'contactEmail', type: 'email'}),
  defineField({name: 'phone', type: 'string'}),
  defineField({name: 'address', type: 'string'}),
  defineField({name: 'linkedin', type: 'url'}),
  defineField({name: 'x', title: 'X', type: 'url'}),
  defineField({name: 'instagram', type: 'url'}),
  defineField({name: 'seoTitleTemplate', type: 'string'}),
  defineField({name: 'seoDescriptionTemplate', type: 'text', rows: 3}),
  defineField({name: 'canonicalBase', type: 'url'}),
  defineField({name: 'defaultSchemaType', type: 'string'}),
  defineField({name: 'targetKeywords', type: 'array', of: [defineArrayMember({type: 'string'})]}),
  defineField({name: 'competitorDomains', type: 'array', of: [defineArrayMember({type: 'string'})]}),
  defineField({name: 'competitorProvider', type: 'string'}),
  defineField({name: 'keywordProvider', type: 'string'}),
  defineField({name: 'backlinkProvider', type: 'string'}),
  defineField({name: 'backlinkSource', type: 'string'}),
  defineField({name: 'analyticsProperty', type: 'string'}),
  defineField({name: 'performanceProvider', type: 'string'}),
]})

const testimonial = defineType({name: 'testimonial', title: 'Testimonials', type: 'document', icon: HelpCircleIcon, fields: [
  defineField({name: 'name', type: 'string', validation: (rule) => rule.required()}),
  defineField({name: 'role', type: 'string'}),
  defineField({name: 'company', type: 'string'}),
  defineField({name: 'quote', type: 'text', rows: 5, validation: (rule) => rule.required()}),
  defineField({name: 'rating', type: 'number', validation: (rule) => rule.min(1).max(5)}),
  defineField({name: 'status', type: 'string', options: {list: ['pending', 'approved'], layout: 'radio'}, initialValue: 'pending'}),
  defineField({name: 'featured', type: 'boolean'}),
  defineField({name: 'createdAt', type: 'datetime', readOnly: true}),
]})

const jobApplication = defineType({name: 'jobApplication', title: 'Job applications', type: 'document', icon: DocumentTextIcon, fields: [
  defineField({name: 'name', type: 'string'}),
  defineField({name: 'email', type: 'email'}),
  defineField({name: 'role', type: 'string'}),
  defineField({name: 'message', type: 'text', rows: 5}),
  defineField({name: 'status', type: 'string', options: {list: ['new', 'reviewing', 'contacted', 'closed'], layout: 'radio'}, initialValue: 'new'}),
  defineField({name: 'createdAt', type: 'datetime', readOnly: true}),
]})

const lead = defineType({name: 'lead', title: 'Enquiries', type: 'document', icon: DocumentTextIcon, fields: [
  defineField({name: 'name', type: 'string'}),
  defineField({name: 'email', type: 'email'}),
  defineField({name: 'company', type: 'string'}),
  defineField({name: 'message', type: 'text', rows: 5}),
  defineField({name: 'status', type: 'string', options: {list: ['new', 'contacted', 'qualified', 'closed'], layout: 'radio'}, initialValue: 'new'}),
  defineField({name: 'createdAt', type: 'datetime', readOnly: true}),
]})

const adminUser = defineType({name: 'adminUser', title: 'Admin users', type: 'document', icon: UserIcon, fields: [
  defineField({name: 'email', type: 'email', validation: (rule) => rule.required()}),
  defineField({name: 'role', type: 'string', options: {list: ['admin', 'editor'], layout: 'radio'}, initialValue: 'editor'}),
  defineField({name: 'isActive', type: 'boolean', initialValue: true}),
  defineField({name: 'passwordHash', type: 'string', readOnly: true, hidden: true}),
  defineField({name: 'createdAt', type: 'datetime', readOnly: true}),
]})

export const schemaTypes = [seo, service, industry, insight, resource, faq, caseStudyCategory, caseStudy, developer, job, sitePage, siteAsset, siteSettings, testimonial, jobApplication, lead, adminUser]
