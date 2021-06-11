# us_elections
Repo for US elections D3 project

HOW TO INTERACT WITH THIS VISUALISATION
User Guide
In order to view this narrative visualisation, the user needs to simply scroll down through the document and click or change the appropriate interactivity operations to explore the visualisations further.
In terms of the general structure of the document, following the title, each subheading contains a quick introduction to the following visualisation, and how to use the interactions coded into it. The exact instructions for each visualisation will be described here.
Following the visualisation a short analysis is provided, giving the reader some key insights into the visualisation above.

Visualisation 1: US Map
To initialise the United States map, simply select a year from the drop-down menu. This will then reveal the winning states for that chosen year. Another year can the be selected from the menu and the map will change accordingly.
There is one caveat in that a user cannot initialise the map using the year 2000. This is most likely due to the code thinking that when the year is changed to the year 2000 (on the first time), there has been no selection and therefore no map to update or display.
Lastly, when a user hovers over a given state, the border of the state darkens to black and a tooltip appears with further details about the state, and the winning candidate.

Visualisation 2: Bubble Chart
Scrolling down to the next visualisation, the bubble chart is initialised by selecting the “Show Bubbles!” button located just after the text. This then transitions the chart into view, where each event (bubble) can be interacted with via mouseover effects.
Again, the bubble border transitions to black and a tooltip appears detailing the event and the year it occurred in. When the mouse moves again, the bubble returns to a white border.

Visualisation 3: Bar Charts
Similar to the bubble chart above, the interactivity for the bar charts lies within two buttons at the top of the visualisation. Select either button to see the chosen bar chart transition into view. All elements of the chart change with this selection including the axes scale and labels.
No tooltip is provided in this visualisation as there was no more information to be gained from the dataset behind the visual.

Visualisation 4: Line Graph & Radial Bar Chart
To effectively interact with this visualisation, simply select a given election year. This will then bring up a radial bar chart with the turnout rates of different age groups for the selected election year.
The user can then select a different group from the drop-down menu above the line graph to alter the radial bar chart and display the turnout rates pertaining to that group for the originally selected year.
A user cannot select a group from the top of the visualisation before selecting a year from the plot.
As with many of the other visualisations in this project, a tooltip appears when the mouse is hovered over a datapoint on the line graph. Additionally, the point increases in size when this is done.

Visualisation 5: Divergent Bar Chart
To initialise this chart, click the “Show Me The Money!” button at the top of the visualisation. This transitions in the diverging bar chart, which is coloured red and blue as usual. Both x-axes represent the total spending (in millions of dollars) by each party in each of the last six elections.
A user may again hover over a bar to find out more about the candidate and their spending during the election campaign.
