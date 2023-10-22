<script lang="ts">
  import Metadata from '$lib/components/Metadata.svelte';
  import Occupation from '$lib/components/Occupation.svelte';
  import mcgill from '$static/images/mcgill.svg';
</script>

<Metadata
  title="Muhammad Sohail – Resume"
  description="Software engineer, student, and photographer. Building applications that bring meaning to us."
/>

<div class="layout">
  <p>
    Here is a <a
      href="/assets/Muhammad_Sohail_Resume.pdf"
      class="link"
      target="_blank"
      rel="noopener noreferrer"><em class="keyword underline underline-offset-[3px] decoration-1">hard copy</em></a
    > for those interested.
  </p>
</div>

<section class="layout py-12">
  <h2 class="section-heading">Education</h2>

  <div class="mb-4">
    <div class="flex justify-between items-end">
      <h3 class="text-black text-lg flex gap-2">
        McGill University
        <a href="https://www.mcgill.ca"><img class="coat" src={mcgill} alt="McGill Logo" /></a>
      </h3>
      <div class="text-neutral-500 mb-0.5">2020 — Present</div>
    </div>
    <p class="byline">Honours B.Sc. in Computer Science</p>
  </div>

  <h4 class="font-medium mt-4 mb-1">Technical coursework:</h4>
  <ul>
    <li>
      Distributed Systems (<a
        href="https://www.mcgill.ca/study/2023-2024/courses/comp-512"
        class="link">COMP 512</a
      >)
    </li>
    <li>
      Artificial Intelligence (<a
        href="https://www.mcgill.ca/study/2023-2024/courses/comp-424"
        class="link">COMP 424</a
      >)
    </li>
    <li>
      Statistics (<a href="https://www.mcgill.ca/study/2023-2024/courses/math-324" class="link"
        >MATH 324</a
      >)
    </li>
    <li>
      Numerical Computing (<a
        href="https://www.mcgill.ca/study/2023-2024/courses/comp-350"
        class="link">COMP 350</a
      >)
    </li>
    <li>
      Project in Computer Science (static analysis of test suite quality) (<a
        href="https://www.mcgill.ca/study/2023-2024/courses/comp-400"
        class="link">COMP 400</a
      >)
    </li>
    <li>
      Computer Systems (<a
        href="https://www.mcgill.ca/study/2021-2022/courses/comp-273"
        class="link">COMP 273</a
      >)
    </li>
    <li>
      Honours Algorithms and Data Structures (<a
        href="https://www.mcgill.ca/study/2021-2022/courses/comp-252"
        class="link">COMP 252</a
      >)
    </li>
    <li>
      Linear Algebra (<a href="https://www.mcgill.ca/study/2021-2022/courses/math-223" class="link"
        >MATH 223</a
      >)
    </li>
    <li>
      Operating Systems (<a
        href="https://www.mcgill.ca/study/2023-2023/courses/comp-310"
        class="link">COMP 310</a
      >)
    </li>
    <li>
      Probability (<a href="https://www.mcgill.ca/study/2023-2023/courses/math-323" class="link"
        >MATH 322</a
      >)
    </li>
    <li>
      Programming Languages and Paradigms (<a
        href="https://www.mcgill.ca/study/2022-2023/courses/comp-302"
        class="link">COMP 302</a
      >)
    </li>
    <li>
      Software Design (<a href="https://www.mcgill.ca/study/2022-2023/courses/comp-303" class="link"
        >COMP 303</a
      >)
    </li>
    <li>
      Theory of Computation (<a
        href="https://www.mcgill.ca/study/2023-2023/courses/comp-330"
        class="link">COMP 330</a
      >)
    </li>
  </ul>
</section>

<section class="layout py-12">
  <h2 class="section-heading">Professional Experience</h2>

  <Occupation
    title="Software Engineering Intern"
    company="Autodesk"
    url="https://www.autodesk.com/"
    dates="May 2023 – August 2023"
    location="Montréal, QC"
  >
    <li>
      Fiddled with DevOps work and backend development on our internal product data platform using
      everything from Spring Boot to Bash to Scala and beyond.
    </li>
    <li>
      Had some fun playing with concurrency and I/O optimizations in Gatling for Scala to improve
      our load test performance by about 10 times. Unfortunately, I was able to break our system,
      which I suppose is quite beneficial in the long run.
    </li>
    <li>
      Got to work with some interesting metric and analytic tools like Kibana, Grafana, and
      Prometheus + Thanos. Made some cool dashboards to improve visibility on usage and data
      transfer trends.
    </li>
  </Occupation>

  <Occupation
    title="Data Engineering Intern"
    company="Coveo"
    url="https://www.coveo.com/"
    dates="January 2023 – April 2023"
    location="Montréal, QC"
  >
    <li>
      Did a lot of work on data monitoring and quality. Pioneered our team's data observability
      system with Prefect and Snowflake.
    </li>
    <li>
      Collaborated with stakeholders and other engineers to identify metrics for anomaly detection
      (a much tougher task than you would expect). This offered observability to us but also enabled
      other teams to identify issues in their own implementations.
    </li>
    <li>
      Played around and revamped our Sentry notification system, which significantly increased time
      to resolution and helped identify and address data quality issues.
    </li>
    <li>
      Got a chance to work on some data pipelines with dbt. Mostly doing testing but also adding
      data purges to help keep us frugal on resources.
    </li>
  </Occupation>

  <Occupation
    title="Software Engineering Intern"
    company="Pattern Labs"
    url="https://patternjobs.com/"
    dates="May 2022 – August 2022"
    location="Toronto, ON"
  >
    <li>
      Worked on backend services, cloud development, and data for a fast-growing startup using
      TypeScript Node, AWS, Terraform, and dbt.
    </li>
    <li>
      Worked a lot on observability, setting up service monitoring, metric dashboards, and trace
      propagation using Datadog.
    </li>
    <li>
      Made key contributions to our new data platform, setting up ETL pipelines with dbt, Snowflake,
      and Fivetran.
    </li>
  </Occupation>
</section>

<style lang="postcss">
  .coat {
    @apply w-6 h-6;
  }

  ul {
    @apply list-disc pl-7 marker:text-neutral-400;
  }

  .byline {
    @apply font-serif italic text-[105%];
  }
</style>
