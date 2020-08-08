/**
 * allergist-slider
 * Jessica C. Lee
 *
 * allergist task plugin with continuous outcome predictions and feedback
 *
 **/


jsPsych.plugins['allergist-slider'] = (function() {

  var plugin = {};

  jsPsych.pluginAPI.registerPreload('allergist-slider', 'stimulus_left', 'image');
  jsPsych.pluginAPI.registerPreload('allergist-slider', 'stimulus_centre', 'image');
  jsPsych.pluginAPI.registerPreload('allergist-slider', 'stimulus_right', 'image');

  plugin.info = {
    name: 'allergist-slider',
    description: '',
    parameters: {
      trial_stim: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Trial stim',
        default: null,
        description: 'Trial stim.'
      },
      trial_code: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Trial code',
        default: null,
        description: 'Trial code.'
      },
      cover_text: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Cover text',
        default: null,
        description: 'The text to be displayed at the top of the screen.'
      },
      feedback_cover_text: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Feedback cover text',
        default: null,
        description: 'The text to be displayed at the top of the screen while feedback is presented.'
      },
      stimulus_centre: {
        type: jsPsych.plugins.parameterType.IMAGE,
        pretty_name: 'Stimulus centre',
        default: undefined,
        description: 'The image content to be displayed in centre.'
      },
      stimulus_left: {
        type: jsPsych.plugins.parameterType.IMAGE,
        pretty_name: 'Stimulus left',
        default: undefined,
        description: 'The image content to be displayed on left.'
      },
      stimulus_right: {
        type: jsPsych.plugins.parameterType.IMAGE,
        pretty_name: 'Stimulus right',
        default: undefined,
        description: 'The image content to be displayed on right.'
      },
      stimulus_height: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Main image height',
        default: 300,
        description: 'Set the main image height in pixels'
      },
      stimulus_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Main image width',
        default: null,
        description: 'Set the main image width in pixels'
      },
      maintain_aspect_ratio: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Maintain aspect ratio',
        default: true,
        description: 'Maintain the aspect ratio after setting width or height'
      },
      correct_outcome: {
        type: jsPsych.plugins.parameterType.IMAGE,
        pretty_name: 'Correct outcome image',
        default: null,
        description: 'Image that is associated with the correct answer.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the stimulus.'
      },
      force_correct_button_press: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Force correct button press',
        default: false,
        description: 'If set to true, then the subject must press the correct response key after feedback in order to advance to next trial.'
      },
      min: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Min slider',
        default: 0,
        description: 'Sets the minimum value of the slider.'
      },
      max: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Max slider',
        default: 100,
        description: 'Sets the maximum value of the slider',
      },
      start: {
				type: jsPsych.plugins.parameterType.INT,
				pretty_name: 'Slider starting value',
				default: 50,
				description: 'Sets the starting value of the slider',
			},
      step: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Step',
        default: 1,
        description: 'Sets the step of the slider'
      },
      labels: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        pretty_name:'Labels',
        default: [],
        array: true,
        description: 'Labels of the slider.',
      },
      slider_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name:'Slider width',
        default: 500,
        description: 'Width of the slider in pixels.'
      },
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        array: false,
        description: 'Label of the button to advance.'
      },
      show_stim_with_feedback: {
        type: jsPsych.plugins.parameterType.BOOL,
        default: true,
        no_function: false,
        description: ''
      },
      show_feedback_on_timeout: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Show feedback on timeout',
        default: false,
        description: 'If true, stimulus will be shown during feedback. If false, only the text feedback will be displayed during feedback.'
      },
      timeout_message: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Timeout message',
        default: "<p>Please respond faster.</p>",
        description: 'The message displayed on a timeout non-response.'
      },
      stimulus_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus duration',
        default: null,
        description: 'How long to hide stimulus.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show trial'
      },
      feedback_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Feedback duration',
        default: 2000,
        description: 'How long to show feedback.'
      },
      stagger_slider: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stagger slider presentation',
        default: 500,
        description: 'How long to delay stagger between cues and slider.'
      },
      stagger_feedback: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stagger feedback presentation',
        default: 500,
        description: 'How long to stagger between submit and feedback.'
      }
    }
  }


  plugin.trial = function(display_element, trial) {

    html = '';

    // show cover story text at top of screen
    if (trial.cover_text !== null) {
      html += trial.cover_text;
    }

    // ------------------------------ stimuli ----------------------------------
    // show left stimulus
    html += '<img src="'+trial.stimulus_left+'" style="';
    if(trial.stimulus_height !== null){
      html += 'height:'+trial.stimulus_height+'px; '
      if(trial.main_stimulus_width == null && trial.maintain_aspect_ratio){
        html += 'width: auto; ';
      }
    }
    if(trial.stimulus_width !== null){
      html += 'width:'+trial.stimulus_width+'px; '
      if(trial.main_stimulus_height == null && trial.maintain_aspect_ratio){
        html += 'height: auto; ';
      }
    }
    html += '"></img>';
    // show centre stimulus
    html += '<img src="'+trial.stimulus_centre+'" style="';
    if(trial.stimulus_height !== null){
      html += 'height:'+trial.stimulus_height+'px; '
      if(trial.main_stimulus_width == null && trial.maintain_aspect_ratio){
        html += 'width: auto; ';
      }
    }
    if(trial.stimulus_width !== null){
      html += 'width:'+trial.stimulus_width+'px; '
      if(trial.main_stimulus_height == null && trial.maintain_aspect_ratio){
        html += 'height: auto; ';
      }
    }
    html += '"></img>';
    // show right stimulus
    html += '<img src="'+trial.stimulus_right+'" style="';
    if(trial.stimulus_height !== null){
      html += 'height:'+trial.stimulus_height+'px; '
      if(trial.main_stimulus_width == null && trial.maintain_aspect_ratio){
        html += 'width: auto; ';
      }
    }
    if(trial.stimulus_width !== null){
      html += 'width:'+trial.stimulus_width+'px; '
      if(trial.main_stimulus_height == null && trial.maintain_aspect_ratio){
        html += 'height: auto; ';
      }
    }
    html += '"></img>';
    // -------------------------------------------------------------------------

    display_element.innerHTML += html;

    // hide image after time if the timing parameter is set
    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#jspsych-allergist-slider-stimulus_left').style.visibility = 'hidden';
        display_element.querySelector('#jspsych-allergist-slider-stimulus_centre').style.visibility = 'hidden';
        display_element.querySelector('#jspsych-allergist-slider-stimulus_right').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }

    // stagger onset of slider after cues are presented
    if (trial.stagger_slider !== null) {
      jsPsych.pluginAPI.setTimeout(function() {

        display_element.innerHTML = '';
        html = '';

        // show cover story text at top of screen
        if (trial.cover_text !== null) {
          html += trial.cover_text;
        }

        // ---------------------------- stimuli --------------------------------
        // show left stimulus
        html += '<img src="'+trial.stimulus_left+'" style="';
        if(trial.stimulus_height !== null){
          html += 'height:'+trial.stimulus_height+'px; '
          if(trial.main_stimulus_width == null && trial.maintain_aspect_ratio){
            html += 'width: auto; ';
          }
        }
        if(trial.stimulus_width !== null){
          html += 'width:'+trial.stimulus_width+'px; '
          if(trial.main_stimulus_height == null && trial.maintain_aspect_ratio){
            html += 'height: auto; ';
          }
        }
        html += '"></img>';
        // show centre stimulus
        html += '<img src="'+trial.stimulus_centre+'" style="';
        if(trial.stimulus_height !== null){
          html += 'height:'+trial.stimulus_height+'px; '
          if(trial.main_stimulus_width == null && trial.maintain_aspect_ratio){
            html += 'width: auto; ';
          }
        }
        if(trial.stimulus_width !== null){
          html += 'width:'+trial.stimulus_width+'px; '
          if(trial.main_stimulus_height == null && trial.maintain_aspect_ratio){
            html += 'height: auto; ';
          }
        }
        html += '"></img>';
        // show right stimulus
        html += '<img src="'+trial.stimulus_right+'" style="';
        if(trial.stimulus_height !== null){
          html += 'height:'+trial.stimulus_height+'px; '
          if(trial.main_stimulus_width == null && trial.maintain_aspect_ratio){
            html += 'width: auto; ';
          }
        }
        if(trial.stimulus_width !== null){
          html += 'width:'+trial.stimulus_width+'px; '
          if(trial.main_stimulus_height == null && trial.maintain_aspect_ratio){
            html += 'height: auto; ';
          }
        }
        html += '"></img>';
        // ---------------------------------------------------------------------

        // show prompt
        if (trial.prompt !== null){
          html += trial.prompt;
        }

        // ------------------------------- slider ------------------------------
        html += '<div id="jspsych-html-slider-response-wrapper" style="margin: 100px 0px;">';
        html += '<div class="jspsych-html-slider-response-container" style="position:relative; margin: 0 auto 3em auto; ';
        if(trial.slider_width !== null){
          html += 'width:'+trial.slider_width+'px;';
        }
        html += '">';
        html += '<input type="range" value="'+trial.start+'" min="'+trial.min+'" max="'+trial.max+'" step="'+trial.step+'" style="width: 100%;" id="jspsych-html-slider-response-response"></input>';
        html += '<div>'
        for(var j=0; j < trial.labels.length; j++){
          var width = 100/(trial.labels.length-1);
          var left_offset = (j * (100 /(trial.labels.length - 1))) - (width/2);
          html += '<div style="display: inline-block; position: absolute; left:'+left_offset+'%; text-align: center; width: '+width+'%;">';
          html += '<span style="text-align: center; font-size: 80%;">'+trial.labels[j]+'</span>';
          html += '</div>'
        }
        html += '</div>';
        html += '</div>';
        html += '</div>';
        // ---------------------------------------------------------------------

        // add submit button
        html += '<center><button id="jspsych-allergist-slider-next" class="jspsych-btn">'+trial.button_label+'</button></center>';

        display_element.innerHTML += html;

        document.getElementById('jspsych-allergist-slider-next').style.visibility='hidden'; // hide submit button

        var response = {
          rt: null,
          response: null
        };

        // show continue button once initial response made
        display_element.querySelector('#jspsych-html-slider-response-response').addEventListener('click', function() {

          curResponse = display_element.querySelector('#jspsych-html-slider-response-response').value;

          html = '';

          // show cover story text at top of screen
          if (trial.cover_text !== null) {
            html += trial.cover_text;
          }

          // --------------------------- stimuli -------------------------------
          // show left stimulus
          html += '<img src="'+trial.stimulus_left+'" style="';
          if(trial.stimulus_height !== null){
            html += 'height:'+trial.stimulus_height+'px; '
            if(trial.main_stimulus_width == null && trial.maintain_aspect_ratio){
              html += 'width: auto; ';
            }
          }
          if(trial.stimulus_width !== null){
            html += 'width:'+trial.stimulus_width+'px; '
            if(trial.main_stimulus_height == null && trial.maintain_aspect_ratio){
              html += 'height: auto; ';
            }
          }
          html += '"></img>';
          // show centre stimulus
          html += '<img src="'+trial.stimulus_centre+'" style="';
          if(trial.stimulus_height !== null){
            html += 'height:'+trial.stimulus_height+'px; '
            if(trial.main_stimulus_width == null && trial.maintain_aspect_ratio){
              html += 'width: auto; ';
            }
          }
          if(trial.stimulus_width !== null){
            html += 'width:'+trial.stimulus_width+'px; '
            if(trial.main_stimulus_height == null && trial.maintain_aspect_ratio){
              html += 'height: auto; ';
            }
          }
          html += '"></img>';
          // show right stimulus
          html += '<img src="'+trial.stimulus_right+'" style="';
          if(trial.stimulus_height !== null){
            html += 'height:'+trial.stimulus_height+'px; '
            if(trial.main_stimulus_width == null && trial.maintain_aspect_ratio){
              html += 'width: auto; ';
            }
          }
          if(trial.stimulus_width !== null){
            html += 'width:'+trial.stimulus_width+'px; '
            if(trial.main_stimulus_height == null && trial.maintain_aspect_ratio){
              html += 'height: auto; ';
            }
          }
          html += '"></img>';
          // -------------------------------------------------------------------

          // show prompt
          if (trial.prompt !== null){
            html += trial.prompt;
          }

          // ----------------------------- slider ------------------------------
          html += '<div id="jspsych-html-slider-response-wrapper" style="margin: 100px 0px;">';
          html += '<div class="jspsych-html-slider-response-container" style="position:relative; margin: 0 auto 3em auto; ';
          if(trial.slider_width !== null){
            html += 'width:'+trial.slider_width+'px;';
          }
          html += '">';
          html += '<input type="range" value="'+curResponse+'" min="'+trial.min+'" max="'+trial.max+'" step="'+trial.step+'" style="width: 100%;" id="jspsych-html-slider-response-response"></input>';
          html += '<div>'
          for(var j=0; j < trial.labels.length; j++){
            var width = 100/(trial.labels.length-1);
            var left_offset = (j * (100 /(trial.labels.length - 1))) - (width/2);
            html += '<div style="display: inline-block; position: absolute; left:'+left_offset+'%; text-align: center; width: '+width+'%;">';
            html += '<span style="text-align: center; font-size: 80%;">'+trial.labels[j]+'</span>';
            html += '</div>'
          }
          html += '</div>';
          html += '</div>';
          html += '</div>';
          // -------------------------------------------------------------------

          html += '<center><button id="jspsych-allergist-slider-next" class="jspsych-btn">'+trial.button_label+'</button></center>';

          display_element.innerHTML = html;

          // when 'continue' button clicked
          display_element.querySelector('#jspsych-allergist-slider-next').addEventListener('click', function() {

            // measure response time
            var endTime = (new Date()).getTime();
            response.rt = endTime - startTime;
            response.response = display_element.querySelector('#jspsych-html-slider-response-response').value;
            after_response();

            // save data
            trial_data = {
              "trial_stim": trial.trial_stim,
              "trial_code": trial.trial_code,
              "left stimulus": trial.stimulus_left,
              "centre stimulus": trial.stimulus_centre,
              "right stimulus": trial.stimulus_right,
              "correct_outcome": trial.correct_outcome,
              "rt": response.rt,
              "response": response.response
            };

          });

        });

      }, trial.stagger_slider);
    }

    var trial_data = {};

    // create response function
    var after_response = function(info) {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // clear keyboard listener
      jsPsych.pluginAPI.cancelAllKeyboardResponses();
      display_element.innerHTML = '';
      var timeout = null;
      doFeedback(timeout)
    }

    function doFeedback(timeout) {

      if (timeout && !trial.show_feedback_on_timeout) {
        display_element.innerHTML += trial.timeout_message;
      } else {
        // show image during feedback if flag is set
        if (trial.show_stim_with_feedback) {

          html = '';

          // show cover story text at top of screen
          if (trial.cover_text !== null) {
            html += trial.cover_text;
          }

          // --------------------------- stimuli -------------------------------
          // show left stimulus
          html += '<img src="'+trial.stimulus_left+'" style="';
          if(trial.stimulus_height !== null){
            html += 'height:'+trial.stimulus_height+'px; '
            if(trial.main_stimulus_width == null && trial.maintain_aspect_ratio){
              html += 'width: auto; ';
            }
          }
          if(trial.stimulus_width !== null){
            html += 'width:'+trial.stimulus_width+'px; '
            if(trial.main_stimulus_height == null && trial.maintain_aspect_ratio){
              html += 'height: auto; ';
            }
          }
          html += '"></img>';
          // show centre stimulus
          html += '<img src="'+trial.stimulus_centre+'" style="';
          if(trial.stimulus_height !== null){
            html += 'height:'+trial.stimulus_height+'px; '
            if(trial.main_stimulus_width == null && trial.maintain_aspect_ratio){
              html += 'width: auto; ';
            }
          }
          if(trial.stimulus_width !== null){
            html += 'width:'+trial.stimulus_width+'px; '
            if(trial.main_stimulus_height == null && trial.maintain_aspect_ratio){
              html += 'height: auto; ';
            }
          }
          html += '"></img>';
          // show right stimulus
          html += '<img src="'+trial.stimulus_right+'" style="';
          if(trial.stimulus_height !== null){
            html += 'height:'+trial.stimulus_height+'px; '
            if(trial.main_stimulus_width == null && trial.maintain_aspect_ratio){
              html += 'width: auto; ';
            }
          }
          if(trial.stimulus_width !== null){
            html += 'width:'+trial.stimulus_width+'px; '
            if(trial.main_stimulus_height == null && trial.maintain_aspect_ratio){
              html += 'height: auto; ';
            }
          }
          html += '"></img>';
          // -------------------------------------------------------------------

          // // show blank outcome
          // html += '<center><img id="jspsych-allergist-slider-outcome" class="jspsych-allergist-slider-outcome" src="'+trial.blank_outcome+'"></img></center>';

          display_element.innerHTML = html;
        }

        jsPsych.pluginAPI.setTimeout(function() {

          html = '';

          // show cover story text at top of screen
          if (trial.cover_text !== null) {
            html += trial.cover_text;
          }

          // --------------------------- stimuli -------------------------------
          // show left stimulus
          html += '<img src="'+trial.stimulus_left+'" style="';
          if(trial.stimulus_height !== null){
            html += 'height:'+trial.stimulus_height+'px; '
            if(trial.main_stimulus_width == null && trial.maintain_aspect_ratio){
              html += 'width: auto; ';
            }
          }
          if(trial.stimulus_width !== null){
            html += 'width:'+trial.stimulus_width+'px; '
            if(trial.main_stimulus_height == null && trial.maintain_aspect_ratio){
              html += 'height: auto; ';
            }
          }
          html += '"></img>';
          // show centre stimulus
          html += '<img src="'+trial.stimulus_centre+'" style="';
          if(trial.stimulus_height !== null){
            html += 'height:'+trial.stimulus_height+'px; '
            if(trial.main_stimulus_width == null && trial.maintain_aspect_ratio){
              html += 'width: auto; ';
            }
          }
          if(trial.stimulus_width !== null){
            html += 'width:'+trial.stimulus_width+'px; '
            if(trial.main_stimulus_height == null && trial.maintain_aspect_ratio){
              html += 'height: auto; ';
            }
          }
          html += '"></img>';
          // show right stimulus
          html += '<img src="'+trial.stimulus_right+'" style="';
          if(trial.stimulus_height !== null){
            html += 'height:'+trial.stimulus_height+'px; '
            if(trial.main_stimulus_width == null && trial.maintain_aspect_ratio){
              html += 'width: auto; ';
            }
          }
          if(trial.stimulus_width !== null){
            html += 'width:'+trial.stimulus_width+'px; '
            if(trial.main_stimulus_height == null && trial.maintain_aspect_ratio){
              html += 'height: auto; ';
            }
          }
          html += '"></img>';
          // -------------------------------------------------------------------

          display_element.innerHTML = html;

          // show the feedback
          display_element.innerHTML += '<center><img id="jspsych-allergist-slider-outcome" class="jspsych-allergist-slider-outcome" src="'+trial.correct_outcome+'"></img></center>';

        }, trial.stagger_feedback);
      }

      // check if force correct button press is set
      if (trial.force_correct_button_press && ((timeout && trial.show_feedback_on_timeout) || !timeout)) {

        var after_forced_response = function(info) {
          endTrial();
        }

        jsPsych.pluginAPI.getKeyboardResponse({
          callback_function: after_forced_response,
          valid_responses: [trial.key_answer],
          rt_method: 'date',
          persist: false,
          allow_held_key: false
        });

      } else {
        jsPsych.pluginAPI.setTimeout(function() {
          endTrial();
        }, trial.feedback_duration);
      }

    }

    function endTrial() {
      display_element.innerHTML = '';
      jsPsych.finishTrial(trial_data);
    }

    var startTime = (new Date()).getTime();
  };

  return plugin;
})();
