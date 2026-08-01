import { GitHubContributions } from "@/features/portfolio/components/github-contributions"
import { Panel, PanelHeader, PanelTitle } from "@/features/portfolio/components/panel"

export function About() {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>About</PanelTitle>
      </PanelHeader>
      <GitHubContributions />
    </Panel>
  )
}
