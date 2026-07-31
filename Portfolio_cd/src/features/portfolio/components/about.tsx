import { GitHubContributions } from "@/features/portfolio/components/github-contributions"
import { Panel, PanelHeader, PanelTitle } from "@/features/portfolio/components/panel"

const ID = "about"

export function About() {
  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>About</PanelTitle>
      </PanelHeader>
      <GitHubContributions />
    </Panel>
  )
}
