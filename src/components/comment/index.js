import React, { Component } from 'react'

export default class Comment extends Component {
    render() {
        return (
            <div class="uk-section-muted uk-section uk-section-medium">
                <div class="uk-container uk-container-small">
                    <div class="uk-tile uk-tile-default uk-border-rounded uk-box-shadow-small uk-padding">
                        <div uk-grid class="uk-child-width-1-1 tm-comment-list uk-margin-large-top">
                            <div>
                                <div uk-grid class="uk-grid-collapse">
                                    <div class="uk-width-1-1@s uk-width-5-6@m">
                                        <div class="uk-comment uk-comment-primary uk-border-rounded">
                                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
                                        </div>
                                    </div>
                                    <div class="uk-width-1-6@m uk-flex-first@m">
                                        <div class="uk-comment-avatar uk-flex uk-flex-left">
                                            <div class="uk-width-small uk-text-center">
                                                <span uk-icon="icon: user; ratio: 2.5"></span>
                                                <h6 class="uk-margin-top">Anonym</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
