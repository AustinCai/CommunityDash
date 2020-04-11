import React, { Component } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import './App.css';

const searchClient = algoliasearch('B1G2GM9NG0', 'aadef574be1f9252bb48d4ea09b5cfe5');

export class SearchComponent extends Component {
  render() {
    return (
      <div className="ais-InstantSearch">
        <InstantSearch indexName="demo_ecommerce" searchClient={searchClient}>
            <SearchBox />
            {/* <Hits hitComponent={Hit}/>
            <Pagination /> */}
        </InstantSearch>
      </div>
    );
  }
}

function Hit(props) {
  return (
    <article>
      <h1>
        <Highlight attribute="name" hit={props.hit} />
      </h1>
    </article>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

// export default SearchComponent;
