import type {StructureResolver} from 'sanity/structure'

const selectedPageRoutes = `path in ["/","/shopify-development","/shopify-app-development-company","/services/shopify-website-development","/services/shopify-development","/services/recover-shopify-abandoned-checkouts","/services","/services/generative-ai-development-company","/services/ai-agents-and-automation-solutions","/services/ai-app-development-company","/services/ai-chatbot-development-company","/services/machine-learning","/services/nlp-development","/services/rag-as-a-service","/services/outsourcing-ai-development","/ai-consulting-services","/about","/portfolio","/resources/blogs","/hire-developers","/careers","/contact"]`

export const structure: StructureResolver = (S) => {
  const pageList = S.listItem()
    .id('sitePage')
    .title('Site Pages')
    .child(
      S.documentTypeList('sitePage')
        .title('Selected site pages')
        .filter(`_type == "sitePage" && (${selectedPageRoutes})`),
    )

  return S.list()
    .title('Kodrise Content')
    .items(
      S.documentTypeListItems().map((item) =>
        item.getId() === 'sitePage' ? pageList : item,
      ),
    )
}
