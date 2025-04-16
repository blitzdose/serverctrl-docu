import { request } from '@octokit/request';
import React, { useState, useEffect } from 'react';

import PlannedIcon from '@site/static/img/planned.svg';
import InProgressIcon from '@site/static/img/in_progress.svg';
import DoneIcon from '@site/static/img/done.svg';

import Admonition from '@theme/Admonition';

import styles from './styles.module.css';

const issueType = {
    DONE: {
        type: "note",
        icon: <DoneIcon />
    },
    IN_PROGRESS: {
        type: "tip",
        icon: <InProgressIcon />
    },
    TODO: {
        type: "warning",
        icon: <PlannedIcon />
    }
}

function parseIssueType(issue) {
  if (issue.labels[0].name.toLowerCase() === "done") {
    return issueType.DONE;
  } else if (issue.labels[0].name.toLowerCase() === "in progress") {
    return issueType.IN_PROGRESS;
  } else if (issue.labels[0].name.toLowerCase() === "todo") {
    return issueType.TODO;
  }
}

function Feature({title, milestone, description, issueType}) {
    return (
        <Admonition className={styles.timelineadmonition} type={issueType.type} icon={issueType.icon} title={title}>
            {description}
        </Admonition>
    );
}

function parseETA(issue) {
  let date = new Date(issue.milestone.due_on)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });
}


//function Feature({Svg, title, description}) {
//  return (
//    <div className={clsx('col col--4')}>
//      <div className="text--center">
//        <Svg className={styles.featureSvg} role="img" />
//      </div>
//      <div className="text--center padding-horiz--md">
//        <Heading as="h3">{title}</Heading>
//        <p>{description}</p>
//      </div>
//    </div>
//  );
//}

export default function Roadmap() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await request('GET /repos/{owner}/{repo}/issues?state=all', {
            owner: 'blitzdose',
            repo: 'serverctrl-docu',
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          })

          if (result.status == 200) {
            const priorityOrder = {
              "todo": 1,
              "in progress": 2,
              "done": 3
            };

            var issues = result.data.sort((a, b) => {
              if (b.milestone.due_on === a.milestone.due_on) {
                return priorityOrder[a.labels[0].name.toLowerCase()] - priorityOrder[b.labels[0].name.toLowerCase()];
              }
              return new Date(b.milestone.due_on) - new Date(a.milestone.due_on)
            });

            setData(issues);
          } else {
            setError(result.status);
          }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  var elements = [];

  var counter = 0;
  var lastVersion = "";

  for (let issue of data) {
    if (counter % 2 === 0) {
      if (lastVersion !== issue.milestone.title) {
        lastVersion = issue.milestone.title
        elements.push(
          <div className={styles.center}>
              <div className={styles.version}>{issue.milestone.title}<div className={styles.eta}>{parseETA(issue)}</div></div>
            </div>
        )
      }
      elements.push(
          <div className={styles.row}>
            <div className={styles.left}><Feature title={issue.title} description={issue.body} milestone={issue.milestone.title} issueType={parseIssueType(issue)}/></div>
            <div className={styles.center}></div>
            <div className={styles.right}></div>
          </div>
      );
    } else {
      elements.push(
        <div className={styles.row}>
          <div className={styles.left}></div>
          <div className={styles.center}></div>
          <div className={styles.right}><Feature title={issue.title} description={issue.body} milestone={issue.milestone.title} issueType={parseIssueType(issue)}/></div>
        </div>
      );
    }
    counter++;
  }


  return (
    <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.timeline}>
            {elements}
          </div>
        </div>
    </section>
  );
}
