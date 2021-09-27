import { useCallback, useMemo, useState } from "react";
import _ from "lodash";
import { IShow, IShowMetadata, questionMapping, shows } from "./shows";

const ALL_CHOICES = Object.keys(questionMapping) as (keyof typeof questionMapping)[];

function FlowChart() {

  const [currentFilter, setCurrentFilter] = useState<Partial<Record<keyof IShowMetadata, boolean>>>({});
  const relevantShows = useMemo(() => {
    return shows.filter(show => {

      return _.every(currentFilter, (v, k) => show.metadata[k as keyof IShowMetadata] === v)
    });
  }, [shows, currentFilter])

  const nextChoiceKey: (keyof IShowMetadata | null) = useMemo(() => {
    const remainingKeys = _.difference(ALL_CHOICES, _.keys(currentFilter)) as (keyof IShowMetadata)[];
    const bestKey = _.minBy(remainingKeys, k => {
      const partition = _.partition(relevantShows, show => show.metadata[k]);
      return Math.abs(partition[0].length - partition[1].length);
    });

    if (!bestKey) {
      return null;
    }

    // If we've gotten to end, show results
    const bestPartition = _.partition(relevantShows, show => show.metadata[bestKey]);
    if (_.some(bestPartition, p => p.length === 0)) {
      return null;
    }
    return bestKey;
  }, [currentFilter, relevantShows]);

  const makeChoice = useCallback((nextValue: boolean) => {
    if (!nextChoiceKey) {
      return;
    }

    setCurrentFilter({
      ...currentFilter,
      [nextChoiceKey]: nextValue,
    });
  }, [nextChoiceKey, currentFilter, setCurrentFilter]);

  const hasEndorsed = useMemo(() => {
    return relevantShows.some(s => s.endorsed);
  }, [relevantShows]);

  if (!nextChoiceKey) {
    return (
      <div>
        <h2>Congrats, you've made it to the end!</h2>
        <p>
          {relevantShows.length === 1 ? `Here's a show you'll (hopefully) like!` : `Here are some shows you'll (hopefully) like!`}

        </p>
        <div className="flexseal">
          {relevantShows.map((show, i) => (
            <Show show={show} key={i}/>
          ))}
        </div>

        {hasEndorsed && (
          <p>Psst: If a show has a 💫 next to it, that means Matt has seen some (or all) of this show, and highly recommends it / would be super down to watch it again!</p>
        )}
      </div>
    )
  }

  const nextChoice = questionMapping[nextChoiceKey];

  return (
    <div>
      <h2>Let's find your next show!</h2>
      <p>There are {relevantShows.length} options that we've gotta whittle down!</p>

      <h3>{nextChoice.question}</h3>
      <div onClick={() => makeChoice(true)} className="cute-as-a stout">👍 {nextChoice.yes ?? `Yes`}</div>
      <div onClick={() => makeChoice(false)} className="cute-as-a stout">👎 {nextChoice.no ?? `No`}</div>
    </div>
  )
}

function Show(props: {show: IShow}) {
  const open = useCallback(() => {
    window.open(props.show.url, '_blank');
  }, [props.show.url])
  return (
    <div className="show" onClick={open}>
      <h3>{props.show.name} {props.show.endorsed ? `💫` : ``}</h3>
      <img src={props.show.imageUrl}/>
      {props.show.description ?? null}
    </div>
  )
}

export default FlowChart;