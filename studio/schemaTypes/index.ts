import {defineArrayMember, defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'
import {DocumentIcon} from '@sanity/icons/Document'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {HelpCircleIcon} from '@sanity/icons/HelpCircle'
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
  defineField({name: 'seo', type: 'seo'}),
]})

const caseStudyCategory = defineType({name: 'caseStudyCategory', title: 'Case study categories', type: 'document', icon: TagIcon, fields: [
  defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
  defineField({name: 'description', type: 'text', rows: 3}),
]})

const caseStudy = defineType({name: 'caseStudy', title: 'Case studies', type: 'document', icon: DocumentTextIcon, fields: [
  defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
  defineField({name: 'client', type: 'string', validation: (rule) => rule.required()}),
  defineField({name: 'category', type: 'reference', to: [{type: 'caseStudyCategory'}]}),
  defineField({name: 'stack', title: 'Technology stack', type: 'string'}),
  defineField({name: 'outcome', type: 'text', rows: 4}),
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
  defineField({name: 'heroTitle', type: 'string'}),
  defineField({name: 'heroAccent', type: 'string'}),
  defineField({name: 'heroDescription', type: 'text', rows: 4}),
  defineField({name: 'announcement', type: 'string'}),
  defineField({name: 'primaryCta', type: 'string'}),
  defineField({name: 'secondaryCta', type: 'string'}),
  defineField({name: 'careerIntroTitle', type: 'string'}),
  defineField({name: 'careerIntroDescription', type: 'text', rows: 3}),
  ...['One', 'Two', 'Three', 'Four'].flatMap((number) => [
    defineField({name: `careerDiscipline${number}Title`, title: `Career discipline ${number} title`, type: 'string'}),
    defineField({name: `careerDiscipline${number}Description`, title: `Career discipline ${number} description`, type: 'text', rows: 3}),
  ]),
  defineField({name: 'seo', type: 'seo'}),
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

export const schemaTypes = [seo, service, caseStudyCategory, caseStudy, developer, job, sitePage, siteSettings, testimonial, jobApplication, lead, adminUser]
