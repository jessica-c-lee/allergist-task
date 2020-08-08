# allergist-task
Code template for a standard allergist task experiment.
Author: Jessica C. Lee (last updated August 2020)

Code repo for a standard allergist task with foods as cues and allergic reaction as the outcome.
Created using the [jspsych library](https://www.jspsych.org/)
Created to run on [JATOS](https://www.jatos.org/) with auto-crediting on [SONA](www.sona-systems.com)

## References
de Leeuw, J. R. (2015). jsPsych: A JavaScript library for creating behavioral experiments in a web browser. Behavior Research Methods, 47(1), 1-12. doi:10.3758/s13428-014-0458-y.

Lange K, Kühn S, Filevich E (2015) "Just Another Tool for Online Studies” (JATOS): An Easy Solution for Setup and Management of Web Servers Supporting Online Studies. PLoS ONE 10(6): e0130834. https://doi.org/10.1371/journal.pone.0130834

## Note
* For auto-crediting, include the following text in the "JSON input" box in the Study Properties on JATOS, replacing the link with the client-side completion URL provided by SONA.
{
  "finish_url_base": "https://unsw-psy.sona-systems.com/webstudy_credit.aspx?experiment_id=1296&credit_token=5dece0015dce49e3aff8c7d968517dbd&survey_code="
}

