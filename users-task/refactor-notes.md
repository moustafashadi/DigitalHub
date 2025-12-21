- STEP 1:

  - loaded initial page (before edits) and split the page into the following components:
    - Title
    - Search bar
    - user list
    - user card (div where the selected user's details are shown)

- STEP 2:

  - created components folder containing a file for each component listed above
  - moved each of the components' code into its own component file
  - added the component elements into the users page

- STEP 3:
  - for filtering, i used useMemo instead to save resources and to reduce the execution of expensive filter operation
  - moved all useStates related to user to the useUsers hook in order to isolate user related operations
