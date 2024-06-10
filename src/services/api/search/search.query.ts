import { unbody } from '../unbody.client'

export const getQuerySearch = (query: string) => {
  const queries = [
    unbody.get.googleDoc.select(
      '__typename',
      'originalName',
      'autoSummary',
      'autoKeywords',
      'path',
    ),
    unbody.get.textDocument.select(
      '__typename',
      'originalName',
      'autoKeywords',
      'path',
      'ext' as any,
    ),
    unbody.get.videoFile.select(
      '__typename',
      'originalName',
      'autoKeywords',
      'path',
      'ext',
    ),
    unbody.get.audioFile.select(
      '__typename',
      'originalName',
      'autoKeywords',
      'path',
      'ext',
    ),
    unbody.get.imageBlock.select(
      '__typename',
      'originalName',
      'autoCaption',
      'autoTypes',
      'path',
      'ext',
    ),
  ]
    .map((q) => q?.additional?.('id').limit(10))
    .map((q) =>
      query.trim().length === 0
        ? (q as any).where(({ GreaterThan }: any) => ({
            pathString: GreaterThan('/'),
          }))
        : q.search.about(query, { certainty: 0.65 }),
    )

  return queries
}
